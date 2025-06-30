import { getCachedHomePage } from '@/data/loaders'
import { getStrapiMediaURL } from '@/utils/get-strapi-url'
import { getBaseUrl } from '@/utils/getBaseUrl'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/BlockRenderer'

import { StrapiSEO } from '@/types/types'

async function loader() {
	const data = await getCachedHomePage()
	if (!data) notFound()
	return data.data
}

export async function generateMetadata(): Promise<Metadata> {
	const response = await getCachedHomePage()
	const data = response?.data

	if (!data) {
		return {
			title: 'Главная страница',
			description: 'Описание отсутствует',
			robots: 'noindex, nofollow',
			other: {
				'yandex-verification': '31bfa17869e20b62',
				'google-site-verification': 'zNSEaosP4SWTcCUKKp2N6ylG1QLC4Ync6x5jekoXdV0',
			},
		}
	}

	const seo = data.seo as StrapiSEO | undefined

	if (!seo) {
		return {
			title: 'Главная страница',
			description: 'Описание отсутствует',
			robots: 'index, follow',
		}
	}

	// Проверка openGraph и валидация ogType
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

	const meta: Metadata = {
		title: seo.metaTitle || 'Главная страница',
		description: seo.metaDescription || 'Описание отсутствует',
		robots: seo.metaRobots || 'index, follow',
		alternates: {
			canonical: seo.canonicalURL || getBaseUrl(),
		},
		viewport: seo.metaViewport || 'width=device-width, initial-scale=1',
		other: {
			...(seo.keywords ? { keywords: seo.keywords } : {}),
			...(seo.structuredData ? { 'structured-data': seo.structuredData } : {}),
			'yandex-verification': '31bfa17869e20b62',
			'google-site-verification': 'zNSEaosP4SWTcCUKKp2N6ylG1QLC4Ync6x5jekoXdV0',
		},
		openGraph,
	}

	return meta
}

export default async function HomeRoute() {
	const { blocks } = await loader()
	return <BlockRenderer blocks={blocks} />
}
