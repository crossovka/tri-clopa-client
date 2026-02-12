'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Heading } from '@/components/blocks'
import { StrapiImage } from '@/components/ui'
import { viewportSettings } from '@/utils/animations'
import { processAnimations } from './Process.animations'
import styles from './Process.module.scss'

import type { ProcessProps } from '@/types/blocks.types'

export function Process({ items }: Readonly<ProcessProps>) {
	return (
		<motion.section 
			className={styles.process}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
		>
			<div className="__container">
				<Heading
					text={'Как мы работаем'}
					isCentered
					level={'h2'}
					id={0}
					isCapital={true}
					className={styles.process__title}
				/>
				<motion.ul
					variants={processAnimations.container}
				>
					{items.map((item) => {
						return (
							<motion.li 
								key={item.id} 
								className="h5"
								variants={processAnimations.item}
							>
								<motion.div 
									className={clsx(styles.process__image, '-ibg', '-ibg_contain')}
									variants={processAnimations.image}
								>
									{item.image?.url && (
										<StrapiImage
											src={item.image.url}
											alt={item.image.alternativeText || 'Image'}
											fill
										/>
									)}
								</motion.div>
								<motion.span
									variants={processAnimations.text}
								>
									{item.caption}
								</motion.span>
							</motion.li>
						)
					})}
				</motion.ul>
				<motion.div
					variants={processAnimations.bottomHeading}
				>
					<Heading
						text={'Работа в среднем занимает 40 минут'}
						isCentered
						level={'h5'}
						id={0}
						className={styles.process__title_bottom}
					/>
				</motion.div>
			</div>
		</motion.section>
	)
}
