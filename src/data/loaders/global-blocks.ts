import { fetchAPI } from '@/utils/fetch-api'
import { getStrapiURL } from '@/utils/get-strapi-url'
import qs from 'qs'

import { cache } from 'react'

const globalBlocksQuery = qs.stringify(
	{
		populate: {
			blocks: {
				populate: '*', // или просто '*'
			},
		},
	},
	{ encode: false },
)

export const getCachedGlobalBlocks = cache(async function getCachedGlobalBlocks() {
	const path = 'global-block' // Single Type: /api/global-blocks

	const url = new URL(path, getStrapiURL())
	url.search = globalBlocksQuery

	try {
		const response = await fetchAPI(url.href, {
			method: 'GET',
			next: { revalidate: 60 }, // Кэшировать 60 сек
		})

		return response
	} catch (error) {
		console.error('Error fetching global blocks:', error)
		throw error
	}
})
