'use client'

import { motion } from 'framer-motion'

import { Heading } from '@/components/blocks'

import { viewportSettings } from '@/utils/animations'
import { trustAnimations } from './Trust.animations'
import styles from './Trust.module.scss'

import type { TrustProps } from '@/types/blocks.types'

export function Trust({ items }: Readonly<TrustProps>) {
	return (
		<motion.section 
			className={styles.trust}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
		>
			<div className="__container">
				<Heading
					text="Почему нам доверяют"
					isCentered
					level="h2"
					id={0}
					className={styles.trust__heading}
				/>
				<motion.ul 
					className={styles.list}
					variants={trustAnimations.container}
				>
					{items.map((item, index) => (
						<motion.li 
							key={item.id} 
							className={styles.item}
							variants={trustAnimations.itemAlt}
							custom={index}
						>
							<motion.span 
								className={styles.number}
								variants={trustAnimations.number}
							>
								{index + 1}
							</motion.span>
							<motion.span 
								className={styles.text}
								variants={trustAnimations.text}
							>
								{item.text}
							</motion.span>
						</motion.li>
					))}
				</motion.ul>
			</div>
		</motion.section>
	)
}
