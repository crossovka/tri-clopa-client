import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'

import { cache } from 'react'

const pageBySlugQuery = (slug: string) =>
	qs.stringify(
		{
			filters: {
				slug: { $eq: slug },
			},
			populate: {
				blocks: {
					populate: '*', // Загружаем все вложенные поля блоков
				},
				seo: {
					populate: '*', // подтянуть все поля SEO-плагина
				},
			},
		},
		{ encode: false }, // Отключаем кодирование URL
	)

export const getPageBySlug = cache(async (slug: string) => {
	const url = new URL('pages', getStrapiURL())
	url.search = pageBySlugQuery(slug)

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})
		// console.log(`[getPageBySlug] Response for slug "${slug}":`, response)
		return response
	} catch (error) {
		console.error(`Error fetching page data for slug "${slug}":`, error)
		throw error
	}
})

export async function getPages() {
	const path = 'pages'
	const url = new URL(path, getStrapiURL())
	url.searchParams.set('pagination[limit]', '100')

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		// console.log('[getPages] response:', response)

		return {
			data: response?.data || [],
			meta: response?.meta,
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('[getPages] Error:', error.message)
		} else {
			console.error('[getPages] Unknown error:', error)
		}
		return { data: [], meta: {} }
	}
}
