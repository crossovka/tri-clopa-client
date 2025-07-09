import clsx from 'clsx'

import { BlockRenderer } from '@/components/BlockRenderer'
import { Heading } from '@/components/blocks'
import { Fancybox, StrapiImage } from '@/components/ui'

import styles from './ArticlePageUI.module.scss'

import { Article } from '@/types/articles.types'

type ArticlePageUIProps = {
	article: Article
}

export function ArticlePageUI({ article }: ArticlePageUIProps) {
	return (
		<article className={styles.article}>
			<div className="__container">
				<Heading
					text={article.title}
					isCentered={false}
					level={'h1'}
					id={0}
					className={clsx(styles.heading, 'h1')}
				/>

				<Fancybox className={clsx(styles.image, '-ibg')} delegate="[data-fancybox]">
					{article.image?.url && (
						<StrapiImage
							src={article.image.url}
							alt={article.image.alternativeText || article.title}
							fill
							data-fancybox=""
						/>
					)}
				</Fancybox>
			</div>

			<div className={styles.content}>
				<BlockRenderer blocks={article.blocks || []} />
			</div>
		</article>
	)
}
