import { toASCII } from 'punycode'

export function getHostname(url = process.env.SERVER_URL || ''): string {
	try {
		const parsed = new URL(url)
		return parsed.hostname
	} catch {
		return 'localhost'
	}
}

export function getMediaHostname(url = process.env.SERVER_URL || ''): string {
	const base = getHostname(url)
	const parts = base.split('.')
	if (parts.length < 2) return base
	
	const last = parts.pop()
	return `${parts.join('.')}.media.${last}`
}

// Новая функция: конвертирует домен в Punycode
export function getPunycodeHostname(url = process.env.SERVER_URL || ''): string {
	try {
		const hostname = getHostname(url)
		// Конвертируем кириллицу в Punycode
		return toASCII(hostname)
	} catch {
		return 'localhost'
	}
}

// Новая функция: конвертирует media домен в Punycode
export function getPunycodeMediaHostname(url = process.env.SERVER_URL || ''): string {
	try {
		const mediaHostname = getMediaHostname(url)
		return toASCII(mediaHostname)
	} catch {
		return 'localhost'
	}
}

// Функция возвращает все варианты доменов для Next.js images
export function getAllImageDomains(): string[] {
	const domains = new Set<string>()
	
	// Добавляем стандартные
	domains.add('localhost')
	domains.add(getHostname())
	domains.add(getMediaHostname())
	
	// Добавляем Punycode версии
	domains.add(getPunycodeHostname())
	domains.add(getPunycodeMediaHostname())
	
	// Добавляем IP адрес если есть
	if (process.env.SERVER_IP) {
		domains.add(process.env.SERVER_IP)
	}
	
	// Удаляем undefined/пустые значения
	return Array.from(domains).filter(Boolean)
}