import { getCachedSiteSettings, getGlobalSettings } from '@/data/loaders'
import { ToastProvider } from '@/providers'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { notFound } from 'next/navigation'

import { Footer, Header } from '@/components/_layout'

import '../sass/main.scss'
import '../sass/roots/roots.tokens.scss'

import { Block } from '@/types/types'

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700', '900'],
	display: 'swap',
})

async function loader() {
	try {
		const data = await getGlobalSettings()
		if (!data) return null
		return { ...data.data }
	} catch (error) {
		console.error('Error loading global settings:', error)
		return null
	}
}

export async function generateMetadata(): Promise<Metadata> {
	const data = await loader()
	return {
		title: data?.title || 'Default Title',
		description: data?.description || 'Default Description',
	}
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const data = await loader()
	// throw new Error('ff')
	// Если данные не загрузились, показываем 404
	if (!data) notFound()

	const blocks = data.blocks || []
	const headerData = blocks.find((block: Block) => block.__component === 'layout.header')

	const response = await getCachedSiteSettings()
	const { phoneNumber, whatsapp, email, inn, ogrnip, telegramUsername } = response.data || {}

	// const footerData = blocks.find((block: Block) => block.__component === 'layout.footer')

	return (
		<html lang="en">
			<body className={`${roboto.variable}`}>
				<div className="wrapper" id="wrapper">
					{headerData && (
						<Header
							data={headerData}
							phoneNumber={phoneNumber}
							whatsapp={whatsapp}
							telegramUsername={telegramUsername}
						/>
					)}
					<main>{children}</main>
					<Footer phoneNumber={phoneNumber} email={email} inn={inn} ogrnip={ogrnip} />
					<ToastProvider />
				</div>
			</body>
		</html>
	)
}
