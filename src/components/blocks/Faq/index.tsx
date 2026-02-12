'use client'

import { motion } from 'framer-motion'

import { Heading } from '@/components/blocks'
import { viewportSettings } from '@/utils/animations'
import { faqAnimations } from './Faq.animations'
import styles from './Faq.module.scss'
import { FaqItem } from './FaqItem'

import type { FaqProps } from '@/types/blocks.types'

export function Faq({ items }: Readonly<FaqProps>) {
	return (
		<motion.section 
			className={styles.faq}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
		>
			<div className="__container">
				<Heading
					text="Частые вопросы"
					isCentered
					level="h2"
					id={0}
					className={styles.faq__heading}
				/>
				<motion.ul 
					className={styles.list}
					variants={faqAnimations.container}
				>
					{items.map((item) => (
						<FaqItem 
							key={item.id}
							title={item.title} 
							content={item.content}
							variants={faqAnimations.item}
						/>
					))}
				</motion.ul>
			</div>
		</motion.section>
	)
}
