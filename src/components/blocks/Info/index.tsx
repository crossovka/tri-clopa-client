'use client'

import { motion } from 'framer-motion'

import { viewportSettings } from '@/utils/animations'
import { infoAnimations } from './Info.animations'
import styles from './Info.module.scss'

import type { InfoProps } from '@/types/blocks.types'

export function Info({ items }: Readonly<InfoProps>) {
	return (
		<motion.section
			className={styles.info}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
		>
			<div className="__container">
				<motion.ul
					variants={infoAnimations.container}
				>
					{items.map((item) => {
						return (
							<motion.li
								key={item.id}
								className="h5"
								variants={infoAnimations.item}
							>
								{item.text}
							</motion.li>
						)
					})}
				</motion.ul>
			</div>
		</motion.section>
	)
}
