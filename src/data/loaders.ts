import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'

import { cache } from 'react'

// Формируем правильный запрос с параметрами для заполнения блоков
// const homePageQuery = qs.stringify(
// 	{
// 		populate: {
// 			blocks: {
// 				populate: '*', // Заполнение всех вложенных полей в блоках
// 			},
// 		},
// 	},
// 	{ encode: false }, // Отключаем кодирование URL
// )

const homePageQuery = qs.stringify(
	{
		populate: {
			blocks: {
				populate: '*', // базовое заполнение всех полей блоков
				on: {
					'blocks.services': {
						populate: {
							items: {
								populate: ['image'],
							},
						},
					},
					'blocks.hero-section': {
						populate: {
							image: {
								populate: '*',
							},
						},
					},
					'blocks.info': {
						populate: {
							items: {
								populate: '*',
							},
						},
					},
					'blocks.heading': {
						populate: '*', // у heading, скорее всего, только простые поля, но для консистентности
					},
					'blocks.paragraph': {
						populate: '*',
					},
					'blocks.paragraph-with-image': {
						populate: {
							image: {
								populate: '*',
							},
						},
					},
					'blocks.trust': {
						populate: {
							items: {
								populate: '*',
							},
						},
					},
					'blocks.process': {
						populate: {
							items: {
								populate: {
									image: {
										populate: '*',
									},
								},
							},
						},
					},
					'blocks.faq': {
						populate: {
							items: {
								populate: '*',
							},
						},
					},
					'blocks.image': {
						populate: {
							image: {
								populate: '*',
							},
						},
					},
				},
			},
		},
	},
	{ encode: false },
)

// function buildPopulate(fields: string[], depth: number): any {
// 	if (depth === 0) return true

// 	const result: Record<string, any> = {}

// 	fields.forEach((field) => {
// 		if (field === 'image') {
// 			// Для image, например, не углубляемся дальше
// 			result[field] = { populate: true }
// 		} else {
// 			result[field] = { populate: buildPopulate(fields, depth - 1) }
// 		}
// 	})

// 	return result
// }

// const fields = ['blocks', 'items', 'image'] // Включи сюда все поля, которые надо раскрывать

// const populateObject = buildPopulate(fields, 3) // Глубина 3, не больше

// const homePageQuery = qs.stringify(
// 	{
// 		populate: populateObject,
// 	},
// 	{ encode: false },
// )

// export async function getHomePage() {
// 	const path = 'home-page';
// 	const url = new URL(path, getStrapiURL());
// 	url.search = homePageQuery;

// 	try {
// 		const response = await fetchAPI(url.href, {
// 			method: 'GET',
// 			next: { revalidate: 60 }, // Кэширование на 60 секунд
// 		});

// 		console.log('Home page response:', response);
// 		return response;
// 	} catch (error) {
// 		console.error('Error fetching home page data:', error);
// 		throw error;
// 	}
// }

export const getCachedHomePage = cache(async function getCachedHomePage() {
	const path = 'home-page' // Обрати внимание на корректный путь API в Strapi, обычно /api/...

	// Формируем URL
	const url = new URL(path, getStrapiURL())
	url.search = homePageQuery

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 }, // Кэшировать 60 сек
		})

		// console.log('Home page response:', response)

		return response
	} catch (error) {
		console.error('Error fetching home page data:', error)
		throw error
	}
})

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
			},
		},
		{ encode: false }, // Отключаем кодирование URL
	)

export async function getPageBySlug(slug: string) {
	const path = 'pages'
	const url = new URL(path, getStrapiURL())
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
}

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
	} catch (error) {
		console.error('[getPages] Error:', error)
		return { data: [], meta: {} }
	}
}

const globalSettingQuery = qs.stringify(
	{
		populate: {
			blocks: {
				populate: '*', // Заполнение всех вложенных полей в блоках
			},
		},
	},
	{ encode: false }, // Отключаем кодирование URL
)

export async function getGlobalSettings() {
	const path = 'global'
	const url = new URL(path, getStrapiURL())
	url.search = globalSettingQuery

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 },
		})

		// console.log('getGlobalSettings Response:', response)
		return response
	} catch (error) {
		console.error('API Fetch Error:', error)
		throw new Error('Failed to fetch global settings')
	}
}

// Формируем query для site-settings — только нужные поля
const siteSettingsQuery = qs.stringify(
	{
		fields: ['phoneNumber', 'email', 'inn', 'ogrnip', 'telegramUsername'],
	},
	{ encode: false },
)

export const getCachedSiteSettings = cache(async function getCachedSiteSettings() {
	const path = 'site-setting' // Single Type, UID без id
	const url = new URL(path, getStrapiURL())
	url.search = siteSettingsQuery

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 300 },
		})
		// console.log('Site settings response:', response)
		return response
	} catch (error) {
		console.error('Ошибка при получении site-settings:', error)
		throw new Error('Не удалось получить настройки сайта')
	}
})

export const getCachedArticles = cache(async function getCachedArticles(page = 1, pageSize = 10) {
	const query = qs.stringify(
		{
			fields: ['title', 'slug'],
			populate: { image: true },
			pagination: {
				page,
				pageSize,
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

		return response
	} catch (error) {
		console.error('Ошибка при получении статей:', error)
		throw error
	}
})

export const getArticleBySlug = cache(async function getArticleBySlug(slug: string) {
	const query = qs.stringify(
		{
			filters: { slug: slug },
			populate: { image: true, blocks: { populate: '*' } }, // доп. поля, например, blocks
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
