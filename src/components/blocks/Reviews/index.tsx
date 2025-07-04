'use client'

import clsx from 'clsx'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

// import Image from 'next/image'

import styles from './Reviews.module.scss'

import { ReviewsProps } from '@/types/types'

export function Reviews({ reviews }: ReviewsProps) {
	return (
		<div className={clsx(styles.container, '__container reviews')}>
			<div className={clsx(styles.swiper, 'swiper')}>
				{/* <div className={styles.nav}>
					<button type="button" className={clsx('swiper-button-prev', '-ibg', '-ibg_contain')}>
						<Image src="/icons/arrow.svg" alt="prev" fill priority={true} />
					</button>
					<button type="button" className={clsx('swiper-button-next', '-ibg', '-ibg_contain')}>
						<Image
							src="/icons/arrow.svg"
							alt="next"
							fill
							priority={true}
							style={{ transform: 'rotate(180deg)' }}
						/>
					</button>
				</div> */}

				<Swiper
					modules={[Autoplay, Pagination, Navigation]}
					slidesPerView={1.2}
					spaceBetween={24}
					loop
					pagination={{
						el: '.reviews .swiper-pagination',
						clickable: true,
					}}
					breakpoints={{
						768: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						992: {
							slidesPerView: 3,
							spaceBetween: 24,
						},
					}}
					navigation={{
						nextEl: '.reviews .swiper-button-next',
						prevEl: '.reviews .swiper-button-prev',
					}}
					className={clsx(styles.wrapper, 'swiper-wrapper')}
					// swiper-wrapper добавляется вручную как внешний класс
				>
					{reviews.map((review) => (
						<SwiperSlide key={review.id} className={clsx(styles.slide, 'swiper-slide')}>
							<div className={styles.card}>
								<p className={styles.content}>{review.content}</p>
								<p className={styles.author}>
									<span>{review.name}</span>, {review.city}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>

				<div className={clsx(styles.pagination, 'swiper-pagination')} />
			</div>
		</div>
	)
}
