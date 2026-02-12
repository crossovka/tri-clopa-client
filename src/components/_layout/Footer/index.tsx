'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { PhoneIcon } from '@/components/icons/PhoneIcon'
import { displayPhoneNumber, sanitizePhoneNumber } from '@/utils/formatPhoneNumber'
import { viewportSettings } from '@/utils/animations'
import { footerAnimations } from './Footer.animations'

type FooterProps = {
	phoneNumber: string
	email: string
	inn: string
	ogrnip: string
}

export function Footer({ phoneNumber, email, inn, ogrnip }: FooterProps) {
	return (
		<motion.footer 
			className="footer"
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
			variants={footerAnimations.container}
		>
			<div className="__container">
				<motion.div 
					className="contact"
					variants={footerAnimations.contact}
				>
					<a
						className="telephone"
						href={`tel:+${sanitizePhoneNumber(phoneNumber)}`}
						aria-label={`Позвонить по номеру ${displayPhoneNumber(phoneNumber)}`}
					>
						<PhoneIcon className="icon" />
						<span>{displayPhoneNumber(phoneNumber)}</span>
					</a>
				</motion.div>

				<motion.div 
					className="nameBlock"
					variants={footerAnimations.nameBlock}
				>
					<h6 className="name">ИП Саленков В.В</h6>
					<Link href="/" className="logo" aria-label="На главную страницу">
						Три<span className="highlighted"> Клопа</span>
					</Link>
				</motion.div>

				<motion.ul 
					className="info"
					variants={footerAnimations.info}
				>
					{inn && (
						<motion.li 
							className="infoItem"
							variants={footerAnimations.infoItem}
						>
							<span>ИНН&nbsp;{inn}</span>
						</motion.li>
					)}
					{ogrnip && (
						<motion.li 
							className="infoItem"
							variants={footerAnimations.infoItem}
						>
							<span>ОГРНИП&nbsp;{ogrnip}</span>
						</motion.li>
					)}
					{email && (
						<motion.li 
							className="infoItem"
							variants={footerAnimations.infoItem}
						>
							<a
								href={`mailto:${email}`}
								className="email"
								aria-label="Написать на электронную почту"
							>
								{email}
							</a>
						</motion.li>
					)}
				</motion.ul>
			</div>
		</motion.footer>
	)
}
