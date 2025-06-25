import { getArticleBySlug } from '@/data/loaders'

import type { Metadata } from 'next'

import { ArticlePageUI } from '@/components/pages/ArticlePage'

type Props = {
	params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const article = await getArticleBySlug(slug)

	if (!article) {
		return {
			title: 'Статья не найдена',
		}
	}

	return {
		title: article.title,
		description: article.description || '',
		keywords: article.keywords ? article.keywords.split(',') : [],
		robots: article.robots || 'index, follow',
		alternates: {
			canonical: `/blog/${article.slug}`,
		},
		openGraph: {
			title: article.title,
			description: article.description || '',
			url: `https://example.com/blog/${article.slug}`,
			type: 'article',
		},
	}
}

export default async function ArticlePage({ params }: Props) {
	const { slug } = await params
	const article = await getArticleBySlug(slug)

	if (!article) {
		return <div>Статья не найдена</div>
	}

	return <ArticlePageUI article={article} />
}
