export function getStrapiURL(path: string = ''): string {
	if (!process.env.NEXT_PUBLIC_SERVER_URL) {
		throw new Error('NEXT_PUBLIC_SERVER_URL не определён в переменных окружения')
	}
	const strapiUrl = process.env.NEXT_PUBLIC_SERVER_URL
	return `${strapiUrl}/api/${path}`
}

export function getStrapiMediaURL(path: string = ''): string {
	if (!process.env.NEXT_PUBLIC_SERVER_URL) {
		throw new Error('NEXT_PUBLIC_SERVER_URL не определён в переменных окружениях')
	}
	const strapiUrl = process.env.NEXT_PUBLIC_SERVER_URL
	return `${strapiUrl}${path.startsWith('/') ? '' : '/'}${path}`
}