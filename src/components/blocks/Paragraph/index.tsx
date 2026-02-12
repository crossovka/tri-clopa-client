'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { paragraphViewportSettings } from '@/utils/animations'
import { paragraphAnimations } from './Paragraph.animations'
import styles from './Paragraph.module.scss'

import type { ParagraphProps } from '@/types/blocks.types'

export function Paragraph({ content }: Readonly<ParagraphProps>) {
	return (
		<motion.section 
			className={clsx(styles.paragraph, 'content-field', '__container')}
			initial="hidden"
			whileInView="visible"
			viewport={paragraphViewportSettings}
			variants={paragraphAnimations.fadeInUpSoft}
		>
			<ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
		</motion.section>
	)
}
