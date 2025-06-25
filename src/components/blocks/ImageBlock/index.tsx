import clsx from 'clsx'

import { Fancybox, StrapiImage } from '@/components/ui'

import styles from './ImageBlock.module.scss'

import type { ImageBlockProps } from '@/types/types'

export function ImageBlock({ image }: Readonly<ImageBlockProps>) {
	return (
		<section className={clsx(styles.imageBlock, '__container')}>
			<Fancybox
				className={clsx(styles.imageBlock__image, '-ibg -ibg_contain')}
				delegate="[data-fancybox]"
			>
				<StrapiImage
					src={image.url}
					alt={image.alternativeText || 'Изображение'}
					fill
					data-fancybox=""
				/>
			</Fancybox>
		</section>
	)
}
