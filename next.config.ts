import type { NextConfig } from 'next'

const prodStrapiDomain = new URL(process.env.SERVER_URL || 'http://localhost:1337').hostname

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		domains: [
			'localhost',
			prodStrapiDomain,
			'сервер.три-клопа.рф', // можно оставить
			'сервер.три-клопа.media.рф', // **добавь этот!**
		],
	},
}

export default nextConfig
