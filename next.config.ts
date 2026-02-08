// import { getAllImageDomains, getHostname, getMediaHostname } from '@/utils/strapi-domains'
import { getAllImageDomains } from '@/utils/strapi-domains'

import type { NextConfig } from 'next'

// console.log('👉 Hostname:', getHostname())
// console.log('👉 Media Hostname:', getMediaHostname())

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: false,
	images: {
		// Используем все варианты доменов
		remotePatterns: getAllImageDomains().map(domain => ({
			protocol: 'https',
			hostname: domain,
		})),
		// Или если хотите использовать domains (устаревший способ):
		// domains: getAllImageDomains(),
		
		// Разрешаем все домены (временное решение)
		// unoptimized: true, // раскомментируйте если все еще проблемы
	},
}

export default nextConfig