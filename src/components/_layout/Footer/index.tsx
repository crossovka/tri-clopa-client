import { displayPhoneNumber, sanitizePhoneNumber } from '@/utils/formatPhoneNumber'

import Link from 'next/link'

import { PhoneIcon } from '@/components/icons/PhoneIcon'

type FooterProps = {
	phoneNumber: string
	email: string
	inn: string
	ogrnip: string
}

export function Footer({ phoneNumber, email, inn, ogrnip }: FooterProps) {
	return (
		<footer className="footer">
			<div className="__container">
				<div className="contact">
					<a
						className="telephone"
						href={`tel:+${sanitizePhoneNumber(phoneNumber)}`}
						aria-label={`Позвонить по номеру ${displayPhoneNumber(phoneNumber)}`}
					>
						<PhoneIcon className="icon" />
						<span>{displayPhoneNumber(phoneNumber)}</span>
					</a>
				</div>

				<div className="nameBlock">
					<h6 className="name">ИП Саленков В.В</h6>
					<Link href="/" className="logo" aria-label="На главную страницу">
						Три<span className="highlighted"> Клопа</span>
					</Link>
				</div>

				<ul className="info">
					{inn && (
						<li className="infoItem">
							<span>ИНН&nbsp;{inn}</span>
						</li>
					)}
					{ogrnip && (
						<li className="infoItem">
							<span>ОГРНИП&nbsp;{ogrnip}</span>
						</li>
					)}
					{email && (
						<li className="infoItem">
							<a
								href={`mailto:${email}`}
								className="email"
								aria-label="Написать на электронную почту"
							>
								{email}
							</a>
						</li>
					)}
				</ul>
			</div>
		</footer>
	)
}
