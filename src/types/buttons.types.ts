import { MouseEventHandler, ReactNode } from 'react'

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
