import { ImageProps } from './image.types'

export interface LinkProps {
	id: number
	text: string
	href: string
	isExternal: boolean
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
