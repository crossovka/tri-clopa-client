import { ImageProps } from './elements.types'
import { Block, StrapiSEO } from './types'

export type Article = {
	id: number
	documentId?: string
	title: string
	slug: string
	image: ImageProps
	excerpt?: string
	createdAt?: string
	updatedAt?: string
	publishedAt?: string
	blocks?: Block[]
	seo?: StrapiSEO | null
}

export type ArticlesResponse = {
	data: Article[]
	meta: {
		pagination: {
			page: number
			pageSize: number
			pageCount: number
			total: number
		}
	}
}
