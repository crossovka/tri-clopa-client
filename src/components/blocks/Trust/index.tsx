import { Heading } from '@/components/blocks'

import styles from './Trust.module.scss'

import type { TrustProps } from '@/types/types'

export function Trust({ items }: Readonly<TrustProps>) {
	return (
		<section className={styles.trust}>
			<div className="__container">
				<Heading
					text="Почему нам доверяют"
					isCentered
					level="h2"
					id={0}
					className={styles.trust__heading}
				/>
				<ul className={styles.list}>
					{items.map((item, index) => (
						<li key={item.id} className={styles.item}>
							<span className={styles.number}>{index + 1}</span>
							<span className={styles.text}>{item.text}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	)
}
