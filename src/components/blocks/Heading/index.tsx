import clsx from 'clsx'

import { JSX } from 'react'

import styles from './Heading.module.scss'

import type { HeadingProps } from '@/types/blocks.types'

const defaultLevel: HeadingProps['level'] = 'h3'

export function Heading({ text, isCentered, level, isCapital, className }: Readonly<HeadingProps>) {
	const HeadingTag = (level ?? defaultLevel) as keyof JSX.IntrinsicElements

	return (
		<HeadingTag
			className={clsx(
				styles.heading,
				level, // глобальный класс h1 / h2 ...
				'__container',
				className,
				{
					[styles['heading--centered']]: isCentered,
					[styles['heading--capital']]: isCapital,
				},
			)}
		>
			{text}
		</HeadingTag>
	)
}
