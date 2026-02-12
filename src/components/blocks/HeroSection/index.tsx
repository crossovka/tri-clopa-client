'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { StrapiImage } from '@/components/ui'

import { viewportSettings } from '@/utils/animations'
import { heroAnimations } from './HeroSection.animations'
import styles from './HeroSection.module.scss'

import type { HeroSectionProps } from '@/types/blocks.types'

export function HeroSection({ heading, description, image }: Readonly<HeroSectionProps>) {
	return (
		<motion.section
			className={clsx(styles.hero, 'hero')}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
		>
			<motion.div className={styles.hero__container} variants={heroAnimations.container}>
				<motion.div className={styles.hero__content} variants={heroAnimations.content}>
					{heading && (
						<div className={clsx(styles.hero__heading, 'content-field')}>
							<ReactMarkdown rehypePlugins={[rehypeRaw]}>{heading}</ReactMarkdown>
						</div>
					)}
					{description && (
						<div className={clsx(styles.hero__description, 'content-field')}>
							<ReactMarkdown rehypePlugins={[rehypeRaw]}>{description}</ReactMarkdown>
						</div>
					)}
				</motion.div>
				<motion.div
					className={clsx(styles.hero__image, '-ibg -ibg_contain')}
					variants={heroAnimations.image}
				>
					<StrapiImage
						src={image.url}
						alt={image.alternativeText || 'No alternative text provided'}
						fill
					/>
				</motion.div>
			</motion.div>
		</motion.section>
	)
}
