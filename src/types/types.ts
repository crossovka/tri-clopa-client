import { MouseEventHandler, ReactNode } from 'react'

export type Block =
	| HeroSectionProps
	| InfoProps
	| HeadingProps
	| ParagraphProps
	| ParagraphWithImageProps
	| ImageBlockProps
	| ServicesProps
	| TrustProps
	| ProcessProps
	| FaqProps
	| ReviewsProps
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	| Base<ComponentType, any> // Добавляем базовый тип

type ComponentType =
	| 'blocks.hero-section'
	| 'blocks.info'
	| 'blocks.heading'
	| 'blocks.paragraph'
	| 'blocks.paragraph-with-image'
	| 'blocks.image'
	| 'blocks.faq'
	| 'blocks.contacts'
	| 'blocks.services'
	| 'blocks.process'
	| 'blocks.trust'
	| 'blocks.reviews'
	| 'layout.header'
	| 'layout.footer'

interface Base<T extends ComponentType, D extends object = Record<string, unknown>> {
	id: number
	__component?: T
	documentId?: string
	createdAt?: string
	updatedAt?: string
	publishedAt?: string
	data?: D
}

export interface LinkProps {
	id: number
	text: string
	href: string
	isExternal: boolean
}

export interface ImageProps {
	id: number
	documentId: string
	url: string
	alternativeText: string
}

export interface text {
	id: number
	text: string
}

export interface IconWithCaption {
	id: number
	caption: string
	image: ImageProps
}

export interface spoller {
	id: number
	title: string
	content: string
}

export interface review {
	id: number
	content: string
	name: string
	city: string
}

// Blocks ========================================================================================================================================================

export type ButtonTheme = 'primary' | 'secondary' | 'tertiary'
export type ButtonSize = 'small' | 'medium' | 'large'
export type ButtonType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
	text?: string
	children?: ReactNode
	href?: string
	isExternal?: boolean
	theme?: ButtonTheme
	size?: ButtonSize
	onClick?: MouseEventHandler<HTMLButtonElement>
	disabled?: boolean
	className?: string
	type?: ButtonType
}

export interface HeadingProps extends Base<'blocks.heading'> {
	text: string
	isCentered: boolean
	level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
	isCapital?: boolean
	className?: string
}

export interface HeroSectionProps extends Base<'blocks.hero-section'> {
	heading?: string
	description: string
	image: ImageProps
}

export interface InfoProps extends Base<'blocks.info'> {
	items: text[]
}

export interface ParagraphWithImageProps extends Base<'blocks.paragraph-with-image'> {
	content: string
	image: ImageProps
	reversed?: boolean
}

export interface ParagraphProps extends Base<'blocks.paragraph'> {
	content: string
}

export interface ImageBlockProps extends Base<'blocks.image'> {
	image: ImageProps
}

export interface ContactsProps extends Base<'blocks.contacts'> {
	title: string
	image: ImageProps
}

export interface ServicesProps extends Base<'blocks.services'> {
	items: IconWithCaption[]
}

export interface TrustProps extends Base<'blocks.trust'> {
	items: text[]
}

export interface ProcessProps extends Base<'blocks.process'> {
	items: IconWithCaption[]
}

export interface FaqProps extends Base<'blocks.faq'> {
	items: spoller[]
}

export interface ReviewsProps extends Base<'blocks.reviews'> {
	reviews: review[]
}

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
	ogType: 'website' | 'article' | 'profile' | 'book' // ограничение по типу
}

//========================================================================================================================================================
export interface Page {
	id: number
	documentId: string
	title: string
	slug: string
	createdAt: string // ISO дата
	updatedAt: string // ISO дата
	publishedAt: string // ISO дата
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

export type RobotsMeta =
	| 'index, follow'
	| 'noindex, nofollow'
	| 'noindex, follow'
	| 'index, nofollow'

export interface User {
	id: number | string
	username?: string
	email?: string
	confirmed?: boolean
	blocked?: boolean
	// Можно добавить поля из схемы, если нужно
}

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
