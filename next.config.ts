import { getHostname, getMediaHostname } from '@/utils/strapi-domains'

import type { NextConfig } from 'next'

// console.log('👉 Hostname:', getHostname())
// console.log('👉 Media Hostname:', getMediaHostname())

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		domains: ['localhost', getHostname(), getMediaHostname()],
	},
}

export default nextConfig
