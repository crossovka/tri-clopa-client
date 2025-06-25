import Link from 'next/link'

import styles from './Pagination.module.scss'

type PaginationProps = {
	pagination: {
		page: number
		pageCount: number
		total: number
		pageSize: number
	}
	currentPage: number
}

export function Pagination({ pagination, currentPage }: PaginationProps) {
	const { pageCount } = pagination

	if (pageCount <= 1) return null // Если всего 1 страница, пагинацию не показываем

	const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

	return (
		<nav className={styles.pagination} aria-label="Pagination Navigation">
			{pages.map((page) => (
				<Link
					key={page}
					href={`/blog?page=${page}`}
					className={page === currentPage ? styles.active : ''}
				>
					{page}
				</Link>
			))}
		</nav>
	)
}
