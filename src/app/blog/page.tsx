import { getCachedArticles } from '@/data/loaders'

import { Metadata } from 'next'

import { BlogPageUI } from '@/components/pages/BlogPage'

import { Article } from '@/types/types'

type Props = {
	searchParams?: Promise<{ page?: string }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
	const params = await searchParams
	const page = Number(params?.page || '1')

	const baseTitle = 'Блог о дезинсекции — Советы от профессионалов'
	const baseDescription =
		'Читайте статьи от экспертов по уничтожению насекомых. Узнайте, почему важно обращаться к профессионалам и какие методы работают лучше всего.'

	const isFirstPage = page <= 1

	return {
		title: isFirstPage ? baseTitle : `${baseTitle} — Страница ${page}`,
		description: isFirstPage ? baseDescription : `${baseDescription} (Страница ${page})`,
		keywords: [
			'дезинсекция',
			'уничтожение насекомых',
			'блог дезинсектора',
			'борьба с вредителями',
			'дезинсекция Прогресс',
			'дезинсекция Городской округ Благовещенск',
			'дезинсекция Завитинский район',
			'дезинсекция Михайловка',
			'дезинсекция Городской округ Свободный',
			'дезинсекция Бурея',
			'дезинсекция Новобурейский',
			'дезинсекция Городской округ Райчихинск',
			'дезинсекция Архара',
			'дезинсекция Талакан',
			'дезинсекция Февральск',
		],
		robots: 'index, follow',
		alternates: {
			canonical: page === 1 ? '/blog' : `/blog?page=${page}`,
		},
		openGraph: {
			title: isFirstPage ? baseTitle : `${baseTitle} — Страница ${page}`,
			description: isFirstPage ? baseDescription : `${baseDescription} (Страница ${page})`,
			url: `https://example.com/blog${page === 1 ? '' : `?page=${page}`}`,
			siteName: 'Дезинфектор Про',
			type: 'website',
		},
	}
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
