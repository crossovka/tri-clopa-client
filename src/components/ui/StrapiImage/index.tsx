'use client'

import Image from 'next/image'
import { useState } from 'react'
import { getStrapiMediaURL } from '@/utils/get-strapi-url'

interface StrapiImageProps {
	src: string
	alt: string
	className?: string
	fallbackSrc?: string
	[key: string]: string | number | boolean | undefined
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