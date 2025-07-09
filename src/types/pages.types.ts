import { Block } from './common.types'
import { StrapiSEO } from './seo.types'

export interface Page {
	id: number
	documentId: string
	title: string
	slug: string
	createdAt: string
	updatedAt: string
	publishedAt: string
	blocks?: Block[]
	seo?: StrapiSEO | null
}

export interface PagesResponse {
	data: Page[]
	meta: {
		pagination: {
			start: number
			limit: number
			total: number
		}
	}
}

export interface PaginationMeta {
	page: number
	pageSize: number
	pageCount: number
	total: number
}
