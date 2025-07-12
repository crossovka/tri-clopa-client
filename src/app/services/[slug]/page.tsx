import { getCachedServices, getServiceBySlug } from '@/data/loaders'
import { getCachedGlobalBlocks } from '@/data/loaders/global-blocks'
import { getStrapiMediaURL } from '@/utils/get-strapi-url'
import { getBaseUrl } from '@/utils/getBaseUrl'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/BlockRenderer'

import { Block } from '@/types/common.types'
import { PagesResponse } from '@/types/pages.types'
import { StrapiSEO } from '@/types/seo.types'
import { Service } from '@/types/services.types'

async function loader(slug: string): Promise<{ service: Service; globalBlocks: Block[] }> {
	if (!slug) notFound()

	const [service, globalBlocksRes] = await Promise.all([
		getServiceBySlug(slug),
		getCachedGlobalBlocks(),
	])

	if (!service || !globalBlocksRes?.data?.blocks) notFound()

	return {
		service,
		globalBlocks: globalBlocksRes.data.blocks,
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params

	try {
		const { service } = await loader(slug)
		const seo = service.seo as StrapiSEO | undefined

		if (seo) {
			const validOgTypes = ['website', 'article', 'profile', 'book'] as const
			type ValidOgType = (typeof validOgTypes)[number]

			const ogType = seo.openGraph?.ogType

			const openGraph =
				seo.openGraph && ogType && validOgTypes.includes(ogType)
					? {
							title: seo.openGraph.ogTitle,
							description: seo.openGraph.ogDescription,
							url: seo.openGraph.ogUrl,
							type: ogType as ValidOgType,
							images: seo.metaImage
								? [
										{
											url: getStrapiMediaURL(seo.metaImage.url),
											alt: seo.metaImage.alternativeText || '',
											width: seo.metaImage.width ?? undefined,
											height: seo.metaImage.height ?? undefined,
											type: seo.metaImage.mime,
										},
									]
								: undefined,
						}
					: undefined

			return {
				title: seo.metaTitle || service.title || 'Страница',
				description: seo.metaDescription || 'Описание отсутствует',
				robots: seo.metaRobots || 'index, follow',
				alternates: {
					canonical: seo.canonicalURL || `${getBaseUrl()}/services/${slug}`,
				},
				keywords: seo.keywords || undefined,
				viewport: seo.metaViewport || 'width=device-width, initial-scale=1',
				other: {
					...(seo.structuredData ? { 'structured-data': seo.structuredData } : {}),
				},
				openGraph,
			}
		} else {
			return {
				title: service.title || 'Страница',
				description: 'Описание отсутствует',
				robots: 'index, follow',
				alternates: {
					canonical: `${getBaseUrl()}/services/${slug}`,
				},
				keywords: undefined,
			}
		}
	} catch {
		return {
			title: 'Страница не найдена',
			description: 'Такой страницы не существует',
			robots: 'noindex, nofollow',
		}
	}
}

type PageProps = { params: Promise<{ slug: string }> }

export default async function DynamicPageRoute(props: PageProps) {
	const { slug } = await props.params
	const { service, globalBlocks } = await loader(slug)

	return <BlockRenderer blocks={service.blocks || []} globalBlocks={globalBlocks} />
}

// Заставляет Next.js сгенерировать статически все страницы (например, /o-nas, /nashi-magaziny) при билде или обновлении.
export async function generateStaticParams() {
	const response = (await getCachedServices()) as PagesResponse

	// console.log('[generateStaticParams] getServices response:', JSON.stringify(response, null, 2))
	return response.data.map((page) => ({
		slug: page.slug,
	}))
}
