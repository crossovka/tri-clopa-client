'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { JSX } from 'react'

import { viewportSettings } from '@/utils/animations'
import { getHeadingAnimation } from './Heading.animations'
import styles from './Heading.module.scss'

import type { HeadingProps } from '@/types/blocks.types'

const defaultLevel: HeadingProps['level'] = 'h3'

export function Heading({ text, isCentered, level, isCapital, className }: Readonly<HeadingProps>) {
	const HeadingTag = (level ?? defaultLevel) as keyof JSX.IntrinsicElements
	
	// Выбираем анимацию в зависимости от уровня заголовка
	const animationVariant = getHeadingAnimation(level)

	// Создаем motion компонент для выбранного тега
	const MotionHeading = motion[HeadingTag as keyof typeof motion] as typeof motion.div

	return (
		<MotionHeading
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
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
			variants={animationVariant}
		>
			{text}
		</MotionHeading>
	)
}
