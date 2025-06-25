import type { NextConfig } from 'next'

const prodStrapiDomain = new URL(process.env.SERVER_URL || 'http://localhost:1337').hostname

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		domains: ['localhost', prodStrapiDomain, 'pleasant-purpose-d574ad195c.media.strapiapp.com'],
	},
}

export default nextConfig
