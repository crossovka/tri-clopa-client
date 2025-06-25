import type { NextConfig } from 'next'

const prodStrapiDomain = new URL(process.env.SERVER_URL || 'http://localhost:1337').hostname

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		domains: [
			'localhost',
			prodStrapiDomain,
			'ethical-song-22416b651b.media.strapiapp.com', // ← без https://
		],
	},
}

export default nextConfig
