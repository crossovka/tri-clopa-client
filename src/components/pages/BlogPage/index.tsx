import Link from 'next/link'

import { Heading } from '@/components/blocks'
import { Pagination, StrapiImage } from '@/components/ui'

import styles from './BlogPageUI.module.scss'

import { Article } from '@/types/types'

type BlogPageUIProps = {
	articles: Article[]
	pagination: {
		page: number
		pageCount: number
		total: number
		pageSize: number
	}
	currentPage: number
}

export function BlogPageUI({ articles, pagination, currentPage }: BlogPageUIProps) {
	return (
		<section className={styles.blog}>
			<div className="__container">
				<Heading text="Наш блог" isCentered level="h1" id={0} />
				<div className={styles.blog__list}>
					{articles.map((article) => (
						<Link key={article.id} href={`/blog/${article.slug}`} className={styles.link}>
							<div className={`${styles.imageWrapper} -ibg`}>
								{article.image?.url && (
									<StrapiImage
										src={article.image.url}
										alt={article.image.alternativeText || 'Image'}
										fill
									/>
								)}
							</div>
							<h2>{article.title}</h2>
						</Link>
					))}
				</div>

				<Pagination pagination={pagination} currentPage={currentPage} />
			</div>
		</section>
	)
}
