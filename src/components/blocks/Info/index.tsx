import styles from './Info.module.scss'

import type { InfoProps } from '@/types/types'

export function Info({ items }: Readonly<InfoProps>) {
	return (
		<section className={styles.info}>
			<div className="__container">
				<ul>
					{items.map((item) => {
						return (
							<li key={item.id} className="h5">
								{item.text}
							</li>
						)
					})}
				</ul>
			</div>
		</section>
	)
}
