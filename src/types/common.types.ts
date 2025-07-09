import { FaqProps, HeadingProps, HeroSectionProps, ImageBlockProps, InfoProps, ParagraphProps, ParagraphWithImageProps, ProcessProps, ReviewsProps, ServicesProps, TrustProps } from "./blocks.types"

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

export interface Base<T extends ComponentType, D extends object = Record<string, unknown>> {
	id: number
	__component?: T
	documentId?: string
	createdAt?: string
	updatedAt?: string
	publishedAt?: string
	data?: D
}
