export interface StrapiSEO {
	id: number
	metaTitle: string
	metaDescription: string
	keywords: string
	metaRobots: string
	metaViewport: string | null
	canonicalURL: string
	structuredData: string | null
	metaImage: MetaImage | null
	openGraph: OpenGraph | null
}

export interface MetaImage {
	id: number
	documentId: string
	name: string
	alternativeText: string
	caption: string
	width: number | null
	height: number | null
	formats: Record<string, Format> | null
	hash: string
	ext: string
	mime: string
	size: number
	url: string
	previewUrl: string | null
	provider: string
	provider_metadata: Record<string, unknown> | null
	createdAt: string
	updatedAt: string
	publishedAt: string
}

export interface Format {
	ext: string
	url: string
	hash: string
	mime: string
	name: string
	path: string | null
	size: number
	width: number
	height: number
}

export interface OpenGraph {
	id: number
	ogTitle: string
	ogDescription: string
	ogUrl: string
	ogType: 'website' | 'article' | 'profile' | 'book'
}

export type RobotsMeta =
	| 'index, follow'
	| 'noindex, nofollow'
	| 'noindex, follow'
	| 'index, nofollow'
