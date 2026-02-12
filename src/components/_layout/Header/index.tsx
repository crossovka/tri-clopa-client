'use client'

import { displayPhoneNumber, sanitizePhoneNumber } from '@/utils/formatPhoneNumber'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useEffect, useState } from 'react'

import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { TelegramIcon } from '@/components/icons/TelegramIcon'
import { WhatsappIcon } from '@/components/icons/WhatsappIcon'

import { headerAnimations } from './Header.animations'

import { ButtonProps } from '@/types/buttons.types'
import { LinkProps } from '@/types/elements.types'
import { Service } from '@/types/services.types'

// удобно для динамических классов

interface HeaderProps {
	data: {
		logo: string
		navigation: LinkProps[]
		cta?: ButtonProps
	}
	phoneNumber: string
	whatsapp: string
	telegramUsername: string
	services: Service[]
}

export function Header({ data, phoneNumber, whatsapp, telegramUsername, services }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)
	const [isServicesOpen, setIsServicesOpen] = useState(false)
	const pathname = usePathname()

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50)
		}

		window.addEventListener('scroll', handleScroll)
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add('menu-open')
		} else {
			document.body.classList.remove('menu-open')
		}
	}, [isMenuOpen])

	useEffect(() => {
		if (isServicesOpen) {
			document.body.classList.add('services-open')
		} else {
			document.body.classList.remove('services-open')
		}
	}, [isServicesOpen])

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement
			if (!target.closest('.services-menu')) {
				setIsServicesOpen(false)
			}
		}

		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [])

	if (!data) return null

	const { logo, navigation } = data

	return (
		<motion.header
			className={clsx('header', { 'header--scroll': isScrolled })}
			initial="hidden"
			animate="visible"
			variants={headerAnimations.container}
		>
			<div className="header__container">
				<div className="header__left header-left">
					<motion.div variants={headerAnimations.logo}>
						<Link href="/" className="header-left__logo link">
							<ReactMarkdown rehypePlugins={[rehypeRaw]}>{logo}</ReactMarkdown>
						</Link>
					</motion.div>

					<ul className="header-left__nav">
						{navigation.map((item, index) => {
							const isActive = pathname === item.href
							return (
								<motion.li key={item.id} variants={headerAnimations.navItem(index)}>
									<Link
										href={item.href}
										target={item.isExternal ? '_blank' : '_self'}
										onClick={() => !item.isExternal && setIsMenuOpen(false)}
										className={clsx({ active: isActive })}
									>
										<h5>{item.text}</h5>
									</Link>
								</motion.li>
							)
						})}

						{/* Пункт меню Услуги с выпадашкой */}
						<motion.li className="services-menu" variants={headerAnimations.servicesMenu}>
							<button
								className="services-menu__btn"
								onClick={() => setIsServicesOpen((open) => !open)}
								aria-expanded={isServicesOpen}
							>
								<h5>Услуги</h5>
								<div className="services-menu__icon -ibg -ibg_contain">
									<Image
										src="/icons/arrow.svg"
										alt="next"
										fill
										priority={true}
										style={{ transform: 'rotate(180deg)' }}
									/>
								</div>
							</button>
							{/* {isServicesOpen && ( */}
							<ul className="services-menu__list">
								{services.map((service) => (
									<li key={service.id}>
										<Link
											href={`/services/${service.slug}`}
											onClick={() => {
												setIsMenuOpen(false)
												setIsServicesOpen(false)
											}}
										>
											{service.title}
										</Link>
									</li>
								))}
							</ul>
							{/* // )} */}
						</motion.li>
					</ul>
				</div>

				<div className="header__right header-right">
					{/* WhatsApp */}
					<motion.div variants={headerAnimations.socialItem(0)}>
						<a
							className="header-right__info-item link"
							href={`https://wa.me/${sanitizePhoneNumber(whatsapp)}`}
							aria-label={`Написать в WhatsApp на номер ${displayPhoneNumber(whatsapp)}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="header-right__info-item-icon">
								<WhatsappIcon className="icon" />
							</div>
						</a>
					</motion.div>
					{/* Telegram */}
					<motion.div variants={headerAnimations.socialItem(1)}>
						<a
							className="header-right__info-item link"
							href={`https://t.me/${telegramUsername}`}
							aria-label="Написать в Telegram"
							target="_blank"
							rel="noopener noreferrer"
						>
							<div className="header-right__info-item-icon">
								<TelegramIcon className="icon" />
							</div>
						</a>
					</motion.div>

					{/* Phone */}
					<motion.div variants={headerAnimations.phone}>
						<a
							className="header-right__info-item link"
							href={`tel:+${sanitizePhoneNumber(phoneNumber)}`}
							aria-label={`Позвонить по номеру ${displayPhoneNumber(phoneNumber)}`}
							target="_blank"
						>
							<div className="header-right__info-item-icon">
								<PhoneIcon className="icon" />
							</div>
							<span className="header-right__info-item-link">
								{displayPhoneNumber(phoneNumber)}
							</span>
						</a>
					</motion.div>

					<motion.div variants={headerAnimations.menuButton}>
						<button
							className="icon-menu"
							aria-label="Toggle menu"
							onClick={() => setIsMenuOpen((prev) => !prev)}
						>
							<div className="icon-menu-icon">
								<span></span>
							</div>
						</button>
					</motion.div>
				</div>
			</div>
		</motion.header>
	)
}
