import clsx from 'clsx'

import { BlockRenderer } from '@/components/BlockRenderer'
import { Heading } from '@/components/blocks'
import { StrapiImage } from '@/components/ui'

import styles from './ArticlePageUI.module.scss'

import { Article } from '@/types/types'

type ArticlePageUIProps = {
	article: Article
}

export function ArticlePageUI({ article }: ArticlePageUIProps) {
	return (
		<article className={styles.article}>
			<div className="__container">
				<Heading text={article.title} isCentered level={'h1'} id={0} className={styles.heading} />

				<div className={clsx(styles.image, '-ibg')}>
					{article.image?.url && (
						<StrapiImage
							src={article.image.url}
							alt={article.image.alternativeText || article.title}
							fill
						/>
					)}
				</div>
			</div>
			
			<div className={styles.content}>
				<BlockRenderer blocks={article.blocks || []} />
			</div>
		</article>
	)
}
