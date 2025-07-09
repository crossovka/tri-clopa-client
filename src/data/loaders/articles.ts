import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'

import { cache } from 'react'

export const getCachedArticles = cache(async function getCachedArticles(page = 1, pageSize = 10) {
	const query = qs.stringify(
		{
			fields: ['title', 'slug', 'publishedAt'],
			populate: { image: true },
			pagination: {
				page,
				pageSize,
			},
			sort: ['publishedAt:desc'], // сортировка по дате публикации по убыванию
		},
		{ encode: false },
	)

	const url = new URL('articles', getStrapiURL())
	url.search = query

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		return response
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error('Ошибка при получении статей:', error.message)
		} else {
			console.error('Неизвестная ошибка при получении статей:', error)
		}
		throw error
	}
})

export const getArticleBySlug = cache(async function getArticleBySlug(slug: string) {
	const query = qs.stringify(
		{
			filters: { slug: slug },
			populate: {
				image: true,
				blocks: { populate: '*' },
				seo: { populate: '*' }, // вот это подтянет все поля SEO
			},
		},
		{ encode: false },
	)

	const url = new URL('articles', getStrapiURL())
	url.search = query

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		console.log('Article response from Strapi:', JSON.stringify(response, null, 2))

		// в Strapi response.data — массив, берем первый элемент
		return response.data[0]
	} catch (error) {
		console.error('Ошибка при получении статьи по slug:', error)
		throw error
	}
})
