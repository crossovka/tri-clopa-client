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
			seo: {
				populate: '*', // подтянуть все поля SEO-плагина
			},
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
						populate: '*',
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
					'blocks.reviews': {
						populate: {
							reviews: '*',
						},
					},
				},
			},
		},
	},
	{ encode: false },
)

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
