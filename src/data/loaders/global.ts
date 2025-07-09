import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'

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
