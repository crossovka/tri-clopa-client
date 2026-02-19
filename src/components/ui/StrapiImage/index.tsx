'use client'

import Image from 'next/image'
import { useState } from 'react'

interface StrapiImageProps {
	src: string
	alt: string
	className?: string
	fallbackSrc?: string
	[key: string]: string | number | boolean | undefined
}

// Функция для корректного формирования полного URL картинки из Strapi
export function getStrapiMediaURL(path: string = ''): string {
	if (!path) return ''

	if (path.startsWith('http://') || path.startsWith('https://')) {
		return path
	}

	const strapiUrl = process.env.NEXT_PUBLIC_SERVER_URL
	if (!strapiUrl) {
		throw new Error('NEXT_PUBLIC_SERVER_URL не определён в переменных окружения')
	}

	return `${strapiUrl}${path.startsWith('/') ? '' : '/'}${path}`
}

export function StrapiImage({ 
	src, 
	alt, 
	className, 
	fallbackSrc = '/placeholder-image.webp',
	...rest 
}: Readonly<StrapiImageProps>) {
	const imageUrl = getStrapiMediaURL(src)
	const [hasError, setHasError] = useState(false)
	const [currentSrc, setCurrentSrc] = useState(imageUrl)
	
	// console.log('StrapiImage URL:', imageUrl)
	if (!currentSrc) return null

	const handleError = () => {
		if (!hasError && fallbackSrc) {
			setHasError(true)
			setCurrentSrc(fallbackSrc)
		}
	}

	return (
		<Image 
			src={currentSrc} 
			alt={alt} 
			className={className} 
			loading="lazy" 
			onError={handleError}
			{...rest} 
		/>
	)
}

// Если нужна функция для работы с URL (где иногда приходит полный URL, иногда — относительной)
export function getStrapiMedia(url: string | null) {
	if (!url) return null
	if (url.startsWith('data:')) return url
	if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//')) return url

	return getStrapiMediaURL(url)
}