import clsx from 'clsx'

import { Heading } from '@/components/blocks'
import { StrapiImage } from '@/components/ui'

import styles from './Services.module.scss'

import type { ServicesProps } from '@/types/types'

export function Services({ items }: Readonly<ServicesProps>) {
	return (
		<section className={styles.services}>
			<div className="__container">
				<Heading text={'Услуги'} isCentered level={'h2'} id={0} />
				<ul>
					{items.map((item) => {
						return (
							<li key={item.id} className="h5">
								<div className={clsx(styles.services__image, '-ibg', '-ibg_contain')}>
									{item.image?.url && (
										<StrapiImage
											src={item.image.url}
											alt={item.image.alternativeText || 'Image'}
											fill
										/>
									)}
								</div>
								<span>{item.caption}</span>
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}
