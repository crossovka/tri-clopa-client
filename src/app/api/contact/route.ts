import { getStrapiURL } from '@/utils/get-strapi-url'
import { sendTelegramMessage } from '@/utils/sendTelegramMessage'

import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	try {
		const { name, phone, message } = await request.json()

		// Отправляем данные в Strapi
		const res = await fetch(getStrapiURL('contacts'), {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ data: { name, phone, message } }),
		})

		if (!res.ok) {
			const errorData = await res.json()
			return NextResponse.json({ error: errorData.message }, { status: 500 })
		}

		// Отправляем сообщение в Telegram
		const telegramMessage = `
📬 Новая заявка с сайта:
👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Сообщение: ${message || '—'}
    `
		await sendTelegramMessage(telegramMessage)

		return NextResponse.json({ success: true })
	} catch (e) {
		console.error('Ошибка сервера', e)
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
	}
}
