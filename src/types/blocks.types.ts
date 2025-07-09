import { Base } from './common.types'
import { IconWithCaption, review, spoller, text } from './elements.types'
import { ImageProps } from './image.types'

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
