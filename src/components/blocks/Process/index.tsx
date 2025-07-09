import clsx from 'clsx'

import { Heading } from '@/components/blocks'
import { StrapiImage } from '@/components/ui'

import styles from './Process.module.scss'

import type { ProcessProps } from '@/types/blocks.types'

export function Process({ items }: Readonly<ProcessProps>) {
	return (
		<section className={styles.process}>
			<div className="__container">
				<Heading
					text={'Как мы работаем'}
					isCentered
					level={'h2'}
					id={0}
					isCapital={true}
					className={styles.process__title}
				/>
				<ul>
					{items.map((item) => {
						return (
							<li key={item.id} className="h5">
								<div className={clsx(styles.process__image, '-ibg', '-ibg_contain')}>
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
				<Heading
					text={'Работа в среднем занимает 40 минут'}
					isCentered
					level={'h5'}
					id={0}
					className={styles.process__title_bottom}
				/>
			</div>
		</section>
	)
}
