import { Heading } from '@/components/blocks'

import styles from './Faq.module.scss'
import { FaqItem } from './FaqItem'

import type { FaqProps } from '@/types/types'

export function Faq({ items }: Readonly<FaqProps>) {
	return (
		<section className={styles.faq}>
			<div className="__container">
				<Heading
					text="Частые вопросы"
					isCentered
					level="h2"
					id={0}
					className={styles.faq__heading}
				/>
				<ul className={styles.list}>
					{items.map((item) => (
						<FaqItem key={item.id} title={item.title} content={item.content} />
					))}
				</ul>
			</div>
		</section>
	)
}
