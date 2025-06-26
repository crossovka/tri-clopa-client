import { getCachedHomePage } from '@/data/loaders'

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlockRenderer } from '@/components/BlockRenderer'

async function loader() {
	const data = await getCachedHomePage()
	if (!data) notFound()

	return data.data
}

export async function generateMetadata(): Promise<Metadata> {
	const data = await getCachedHomePage()

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

	const meta: Metadata = {
		title: data.title || 'Главная страница',
		description: data.description || 'Описание отсутствует',
		robots: data.robots || 'index, follow',
		alternates: {
			canonical: data.canonicalUrl || 'https://localhost:3000/',
		},
		other: {
			'yandex-verification': '31bfa17869e20b62',
			'google-site-verification': 'zNSEaosP4SWTcCUKKp2N6ylG1QLC4Ync6x5jekoXdV0',
		},
	}

	if (data.keywords && data.keywords.trim() !== '') {
		meta.other!.keywords = data.keywords
	}

	return meta
}

export default async function HomeRoute() {
	const { blocks } = await loader()

	return <BlockRenderer blocks={blocks} />
}
