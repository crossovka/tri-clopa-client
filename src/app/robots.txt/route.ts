import { getBaseUrl } from '@/utils/getBaseUrl'

export async function GET() {
	const baseUrl = getBaseUrl()

	const content = `User-agent: *
Disallow:

Sitemap: ${baseUrl}/sitemap.xml
`

	return new Response(content, {
		headers: {
			'Content-Type': 'text/plain',
		},
	})
}
