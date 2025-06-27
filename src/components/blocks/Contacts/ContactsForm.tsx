'use client'

// import { contactsService } from '@/data/services/services'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'

import { Button } from '@/components/ui'

import styles from './ContactsForm.module.scss'

// Определяем схему валидации с использованием Yup
const schema = yup
	.object({
		name: yup.string().required('Имя обязательно'),
		phone: yup
			.string()
			.required('Телефон обязателен')
			.matches(/^\+?\d{10,15}$/, 'Неверный формат телефона'),
		message: yup
			.string()
			.required('Сообщение обязательно')
			.min(10, 'Сообщение должно быть не менее 10 символов'),
	})
	.required()

export type FormValues = {
	name: string
	phone: string
	message: string
}

const ContactsForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>({
		resolver: yupResolver(schema),
	})

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (!response.ok) {
				throw new Error('Ошибка при отправке формы')
			}

			toast.success('Сообщение отправлено! Скоро вам перезвонят', {
				position: 'top-right',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			})

			reset()
		} catch (error) {
			console.error('Ошибка при отправке формы:', error)

			toast.error('Произошла ошибка при отправке сообщения. Попробуйте снова.', {
				position: 'top-right',
				autoClose: 3000,
			})
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<div className={styles.formGroup}>
				<label htmlFor="name" className={styles.label}>
					Имя
				</label>
				<input
					id="name"
					type="text"
					{...register('name')}
					className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
				/>
				{errors.name && <p className={styles.error}>{errors.name.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="phone" className={styles.label}>
					Телефон
				</label>
				<input
					id="phone"
					type="tel"
					{...register('phone')}
					className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
				/>
				{errors.phone && <p className={styles.error}>{errors.phone.message}</p>}
			</div>

			<div className={styles.formGroup}>
				<label htmlFor="message" className={styles.label}>
					Сообщение
				</label>
				<textarea
					id="message"
					{...register('message')}
					className={`${styles.input} ${errors.message ? styles.inputError : ''}`}
				/>
				{errors.message && <p className={styles.error}>{errors.message.message}</p>}
			</div>

			<Button
				type="submit"
				text="Отправить"
				theme="primary"
				size="medium"
				className={styles.button}
			/>
		</form>
	)
}

export default ContactsForm
