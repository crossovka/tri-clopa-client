export function getStrapiURL(path: string = ''): string {
	if (!process.env.SERVER_URL) {
		throw new Error('SERVER_URL не определён в переменных окружения')
	}
	const strapiUrl = process.env.SERVER_URL
	return `${strapiUrl}/api/${path}`
}

export function getStrapiMediaURL(path: string = ''): string {
	if (!process.env.SERVER_URL) {
		throw new Error('SERVER_URL не определён в переменных окружениях')
	}
	const strapiUrl = process.env.SERVER_URL
	return `${strapiUrl}${path.startsWith('/') ? '' : '/'}${path}`
}
