'use client'

import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { Heading } from '@/components/blocks'
import { Button } from '@/components/ui'

const ErrorPage = () => {
	const router = useRouter()

	useEffect(() => {
		// Перенаправление на главную страницу через 5 секунд
		setTimeout(() => {
			router.push('/')
		}, 5000)
	}, [router])

	return (
		<div className="error __container">
			<Heading text="Произошла ошибка" level="h1" id={0} isCentered={false} />
			<div className="content-field">
				<p>Что-то пошло не так. Мы перенаправим вас на главную страницу через 5 секунд...</p>
			</div>
			<Button href="/" theme="primary">
				На главную
			</Button>
		</div>
	)
}

export default ErrorPage
