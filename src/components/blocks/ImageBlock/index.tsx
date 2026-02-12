'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Fancybox, StrapiImage } from '@/components/ui'
import { viewportSettings } from '@/utils/animations'
import { imageBlockAnimations } from './ImageBlock.animations'
import styles from './ImageBlock.module.scss'

import type { ImageBlockProps } from '@/types/blocks.types'

export function ImageBlock({ image }: Readonly<ImageBlockProps>) {
	return (
		<motion.section 
			className={clsx(styles.imageBlock, '__container')}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
			variants={imageBlockAnimations.container}
		>
			<Fancybox
				className={clsx(styles.imageBlock__image, '-ibg -ibg_contain')}
				delegate="[data-fancybox]"
			>
				<StrapiImage
					src={image.url}
					alt={image.alternativeText || 'Изображение'}
					fill
					data-fancybox=""
				/>
			</Fancybox>
		</motion.section>
	)
}
