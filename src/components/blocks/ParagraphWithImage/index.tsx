'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { Fancybox, StrapiImage } from '@/components/ui'
import { viewportSettings } from '@/utils/animations'
import { paragraphWithImageAnimations } from './ParagraphWithImage.animations'
import styles from './ParagraphWithImage.module.scss'

import type { ParagraphWithImageProps } from '@/types/blocks.types'

export function ParagraphWithImage({
	content,
	image,
	reversed,
}: Readonly<ParagraphWithImageProps>) {
	// Выбираем анимации в зависимости от reversed
	const textAnimation = reversed 
		? paragraphWithImageAnimations.reversed.text 
		: paragraphWithImageAnimations.text
	
	const imageAnimation = reversed 
		? paragraphWithImageAnimations.reversed.image 
		: paragraphWithImageAnimations.image

	return (
		<motion.section 
			className={styles['text-image']}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
			variants={paragraphWithImageAnimations.container}
		>
			<div
				className={clsx(styles['text-image__container'], {
					[styles['text-image__container--reversed']]: reversed,
				})}
			>
				<motion.div 
					className={clsx(styles['text-image__text'], 'content-field')}
					variants={textAnimation}
				>
					<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
				</motion.div>
				<motion.div
					variants={imageAnimation}
				>
					<Fancybox 
						className={clsx(styles['text-image__image'], '-ibg')} 
						delegate="[data-fancybox]"
					>
						<StrapiImage
							src={image.url}
							alt={image.alternativeText || 'No alternative text provided'}
							fill
							className={styles['text-image__image']}
							data-fancybox=""
						/>
					</Fancybox>
				</motion.div>
			</div>
		</motion.section>
	)
}
