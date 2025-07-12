import { getArticleBySlug } from '@/data/loaders'
import { getCachedGlobalBlocks } from '@/data/loaders/global-blocks'
import { getStrapiMediaURL } from '@/utils/get-strapi-url'
import { getBaseUrl } from '@/utils/getBaseUrl'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ArticlePageUI } from '@/components/pages/ArticlePage'

import { Article } from '@/types/articles.types'
import { Block } from '@/types/common.types'
import { StrapiSEO } from '@/types/seo.types'

async function loader(slug: string): Promise<{ article: Article; globalBlocks: Block[] }> {
	if (!slug) notFound()

	const [article, globalBlocksRes] = await Promise.all([
		getArticleBySlug(slug),
		getCachedGlobalBlocks(),
	])

	if (!article || !globalBlocksRes?.data?.blocks) notFound()

	return {
		article,
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
		const { article } = await loader(slug)
		const seo = article.seo as StrapiSEO | undefined

		const validOgTypes = ['website', 'article', 'profile', 'book'] as const
		type ValidOgType = (typeof validOgTypes)[number]

		const ogType = seo?.openGraph?.ogType

		const openGraph =
			seo?.openGraph && ogType && validOgTypes.includes(ogType)
				? {
						title: seo.openGraph.ogTitle || article.title,
						description: seo.openGraph.ogDescription || article.excerpt || '',
						url: seo.openGraph.ogUrl || `${getBaseUrl()}/blog/${article.slug}`,
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
				: {
						title: article.title,
						description: article.excerpt || '',
						url: `${getBaseUrl()}/blog/${article.slug}`,
						type: 'article',
					}

		return {
			title: seo?.metaTitle || article.title,
			description: seo?.metaDescription || 'Описание отсутствует',
			robots: seo?.metaRobots || 'index, follow',
			keywords: seo?.keywords ? seo.keywords.split(',').map((k) => k.trim()) : undefined,
			viewport: seo?.metaViewport || 'width=device-width, initial-scale=1',
			alternates: {
				canonical: seo?.canonicalURL || `${getBaseUrl()}/blog/${article.slug}`,
			},
			other: {
				...(seo?.structuredData ? { 'structured-data': seo.structuredData } : {}),
			},
			openGraph,
		}
	} catch {
		return {
			title: 'Статья не найдена',
			description: 'Такой статьи не существует',
			robots: 'noindex, nofollow',
		}
	}
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	const { article, globalBlocks } = await loader(slug)
	return <ArticlePageUI article={article} globalBlocks={globalBlocks} />
}
