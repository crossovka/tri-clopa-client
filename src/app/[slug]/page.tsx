import { getPageBySlug } from '@/data/loaders'
import { getPages } from '@/data/loaders'
import { getCachedGlobalBlocks } from '@/data/loaders/global-blocks'
import { getStrapiMediaURL } from '@/utils/get-strapi-url'
import { getBaseUrl } from '@/utils/getBaseUrl'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/BlockRenderer'

import { Block } from '@/types/common.types'
import { Page, PagesResponse } from '@/types/pages.types'
import { StrapiSEO } from '@/types/seo.types'

async function loader(slug: string): Promise<{ page: Page; globalBlocks: Block[] }> {
	if (!slug) notFound()

	const [pageRes, globalBlocksRes] = await Promise.all([
		getPageBySlug(slug),
		getCachedGlobalBlocks(),
	])

	const { data } = pageRes as { data: Page[] }
	if (!data?.length || !globalBlocksRes?.data?.blocks) notFound()

	return {
		page: data[0],
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
		const { page } = await loader(slug)
		const seo = page.seo as StrapiSEO | undefined

		if (seo) {
			const validOgTypes = ['website', 'article', 'profile', 'book'] as const
			type ValidOgType = (typeof validOgTypes)[number] // 'website' | 'article' | 'profile' | 'book'

			const ogType = seo.openGraph?.ogType

			const openGraph =
				seo.openGraph && ogType && validOgTypes.includes(ogType)
					? {
							title: seo.openGraph.ogTitle,
							description: seo.openGraph.ogDescription,
							url: seo.openGraph.ogUrl,
							type: ogType as ValidOgType, // здесь можно не кастить, TS сам понимает
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
				title: seo.metaTitle || page.title || 'Страница',
				description: seo.metaDescription || 'Описание отсутствует',
				robots: seo.metaRobots || 'index, follow',
				alternates: {
					canonical: seo.canonicalURL || `${getBaseUrl()}/${slug}`,
				},
				keywords: seo.keywords || undefined,
				viewport: seo.metaViewport || 'width=device-width, initial-scale=1',
				other: {
					...(seo.structuredData ? { 'structured-data': seo.structuredData } : {}),
				},
				openGraph,
			}
		} else {
			// fallback без SEO блока
			return {
				title: page.title || 'Страница',
				description: 'Описание отсутствует',
				robots: 'index, follow',
				alternates: {
					canonical: `${getBaseUrl()}/${slug}`,
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
	const { page, globalBlocks } = await loader(slug)

	return <BlockRenderer blocks={page.blocks || []} globalBlocks={globalBlocks} />
}

// // Логируем данные всех страниц при загрузке
// const allPagesResponse = await getPages()
// console.log('getPages response:', allPagesResponse)

// Заставляет Next.js сгенерировать статически все страницы (например, /o-nas, /nashi-magaziny) при билде или обновлении.
export async function generateStaticParams() {
	const response = (await getPages()) as PagesResponse

	// console.log('[generateStaticParams] getPages response:', JSON.stringify(response, null, 2))

	return response.data.map((page) => ({
		slug: page.slug,
	}))
}
