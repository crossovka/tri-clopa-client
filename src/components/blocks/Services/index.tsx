'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Heading } from '@/components/blocks'
import { StrapiImage } from '@/components/ui'
import { viewportSettings } from '@/utils/animations'
import { servicesAnimations } from './Services.animations'
import styles from './Services.module.scss'

import type { ServicesProps } from '@/types/blocks.types'

export function Services({ items }: Readonly<ServicesProps>) {
	return (
		<motion.section 
			className={styles.services}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
		>
			<div className="__container">
				<Heading text={'Услуги'} isCentered level={'h2'} id={0} />
				<motion.ul
					variants={servicesAnimations.container}
				>
					{items.map((item) => {
						return (
							<motion.li 
								key={item.id} 
								className="h5"
								variants={servicesAnimations.item}
							>
								<motion.div 
									className={clsx(styles.services__image, '-ibg -ibg_contain')}
									variants={servicesAnimations.image}
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
									variants={servicesAnimations.text}
								>
									{item.caption}
								</motion.span>
							</motion.li>
						)
					})}
				</motion.ul>
			</div>
		</motion.section>
	)
}
