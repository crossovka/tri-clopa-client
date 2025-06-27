export async function sendTelegramMessage(text: string) {
	const token = process.env.TELEGRAM_BOT_TOKEN
	const chatId = process.env.TELEGRAM_CHAT_ID

	if (!token || !chatId) {
		console.error('Отсутствует TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID')
		return
	}

	try {
		await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chat_id: chatId,
				text,
			}),
		})
	} catch (error) {
		console.error('Ошибка при отправке в Telegram:', error)
	}
}
