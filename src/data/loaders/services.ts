import qs from 'qs'

import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'

import { cache } from 'react'

export const getCachedServices = cache(async function getCachedServices(page = 1, pageSize = 100) {
	const query = qs.stringify(
		{
			fields: ['title', 'slug', 'publishedAt'],
			// в шапке не нужны блоки и сео если слаг не оттуда только берётся
			// populate: {
			// 	blocks: { populate: '*' },
			// 	seo: { populate: '*' },
			// },
			pagination: {
				page,
				pageSize,
			},
			sort: ['publishedAt:desc'], // сортировка по дате публикации по убыванию
		},
		{ encode: false },
	)

	const url = new URL('services', getStrapiURL())
	url.search = query

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		// console.log('услуг response:', response)

		return response
	} catch (error) {
		console.error('Ошибка при получении услуг', error)
		throw error
	}
})

export const getServiceBySlug = cache(async function getServiceBySlug(slug: string) {
	const query = qs.stringify(
		{
			filters: { slug },
			populate: {
				blocks: { populate: '*' },
				seo: { populate: '*' },
			},
		},
		{ encode: false },
	)

	const url = new URL('services', getStrapiURL())
	url.search = query

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		// console.log('Service response from Strapi:', JSON.stringify(response, null, 2))

		// Вернёт первую услугу с совпадающим slug
		return response?.data?.[0] ?? null
	} catch (error) {
		console.error('Ошибка при получении услуги по slug:', error)
		throw error
	}
})
