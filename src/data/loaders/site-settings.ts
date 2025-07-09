import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'

import { cache } from 'react'

// Формируем query для site-settings — только нужные поля
const siteSettingsQuery = qs.stringify(
	{
		fields: ['phoneNumber', 'email', 'inn', 'ogrnip', 'telegramUsername', 'whatsapp'],
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
