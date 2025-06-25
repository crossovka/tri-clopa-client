// Удаляет всё лишнее и приводит к международному формату без + (для href)
export function sanitizePhoneNumber(phone?: string): string {
	if (!phone) return '' // если undefined/null — вернуть пустую строку
	return phone.replace(/\D/g, '').replace(/^8/, '7')
}

// Возвращает красиво отформатированный номер: +7 (900) 232-32-32
export function displayPhoneNumber(phone?: string): string {
	const digits = sanitizePhoneNumber(phone)

	if (digits.length !== 11) return phone ?? ''
	const parts = digits.match(/^7(\d{3})(\d{3})(\d{2})(\d{2})$/)
	
	if (!parts) return phone ?? ''
	const [, code, first, second, third] = parts
	return `+7 (${code}) ${first}-${second}-${third}`
}
