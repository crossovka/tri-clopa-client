// import { getStrapiURL } from '@/utils/get-strapi-url'
// import { sendTelegramMessage } from '@/utils/sendTelegramMessage'

// import { FormValues } from '@/components/blocks/Contacts/ContactsForm'

// export async function contactsService(data: FormValues) {
// 	const url = new URL('/api/contacts', getStrapiURL())

// 	try {
// 		const response = await fetch(url.toString(), {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({ data }),
// 		})

// 		if (!response.ok) {
// 			const errorData = await response.json()
// 			throw new Error(errorData.message || 'Ошибка при отправке данных')
// 		}

// 		const message = `
// 		📬 Новая заявка с сайта:

// 		👤 Имя: ${data.name}
// 		📞 Телефон: ${data.phone}
// 		💬 Сообщение: ${data.message || '—'}
// 		`

// 		await sendTelegramMessage(message)

// 		return await response.json()
// 	} catch (error) {
// 		console.error('Contacts Service Error:', error)
// 		throw error
// 	}
// }
