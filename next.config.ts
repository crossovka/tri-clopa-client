import type { NextConfig } from 'next'

const prodStrapiDomain = new URL(process.env.SERVER_URL || 'http://localhost:1337').hostname

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		domains: [
			'localhost',
			prodStrapiDomain,
			'wealthy-cabbage-5ef4edf469.strapiapp.com', // можно оставить
			'wealthy-cabbage-5ef4edf469.media.strapiapp.com', // **добавь этот!**
		],
	},
}

export default nextConfig
