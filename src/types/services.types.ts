import { Block, StrapiSEO } from './types'

export type Service = {
	id: number
	documentId?: string
	title: string
	slug: string
	excerpt?: string
	createdAt?: string
	updatedAt?: string
	publishedAt?: string
	blocks?: Block[]
	seo?: StrapiSEO | null
}

export type ServicesResponse = {
	data: Service[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}
