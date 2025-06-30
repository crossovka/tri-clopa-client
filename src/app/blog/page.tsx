import { getCachedArticles } from '@/data/loaders'

import type { Metadata } from 'next'

import { BlogPageUI } from '@/components/pages/BlogPage'

import { Article } from '@/types/types'

type Props = {
	searchParams?: Promise<{ page?: string }>
}

export const metadata: Metadata = {
	title: 'Блог о дезинсекции — Советы от профессионалов',
	description:
		'Читайте статьи от экспертов по уничтожению насекомых. Узнайте, почему важно обращаться к профессионалам и какие методы работают лучше всего.',
	keywords: ['дезинсекция', 'уничтожение насекомых', 'блог дезинсектора', 'борьба с вредителями'],
	robots: 'index, follow',
	alternates: {
		canonical: '/blog',
	},
	openGraph: {
		title: 'Блог дезинсектора',
		description: 'Полезные статьи о борьбе с насекомыми и защите дома от вредителей.',
		url: 'https://example.com/blog',
		siteName: 'Дезинфектор Про',
		type: 'website',
	},
}

export default async function BlogPage({ searchParams }: Props) {
	const params = await searchParams
	const page = Number(params?.page) || 1
	const pageSize = 8

	const res = await getCachedArticles(page, pageSize)
	const articles: Article[] = res.data
	const pagination = res.meta.pagination

	return <BlogPageUI articles={articles} pagination={pagination} currentPage={page} />
}
