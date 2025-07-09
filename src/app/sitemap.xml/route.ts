import { getCachedArticles, getCachedServices, getPages } from '@/data/loaders'
import { getBaseUrl } from '@/utils/getBaseUrl'

import { Article } from '@/types/articles.types'
import { Page } from '@/types/pages.types'
import { Service } from '@/types/services.types'

export async function GET() {
	const baseUrl = getBaseUrl()
	const now = new Date().toISOString()

	// Параллельно получаем страницы, статьи и услуги
	const [pagesResponse, articlesResponse, servicesResponse] = await Promise.all([
		getPages(),
		getCachedArticles(1, 200),
		getCachedServices(1, 200), // подгружаем до 200 услуг
	])

	const pageUrls = (pagesResponse.data || []).map((page: Page) => {
		return `  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${page.updatedAt || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
	})

	const articleUrls = (articlesResponse.data || []).map((article: Article) => {
		return `  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${article.updatedAt || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
	})

	const serviceUrls = (servicesResponse.data || []).map((service: Service) => {
		return `  <url>
    <loc>${baseUrl}/services/${service.slug}</loc>
    <lastmod>${service.publishedAt || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
	})

	const blogUrl = `  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${articlesResponse.data?.[0]?.updatedAt || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${[blogUrl, ...pageUrls, ...articleUrls, ...serviceUrls].join('\n')}
</urlset>`

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml',
		},
	})
}
