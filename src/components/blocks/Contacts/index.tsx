import clsx from 'clsx'

import { Fancybox, StrapiImage } from '@/components/ui'

import { Heading } from '../Heading'
import styles from './Contacts.module.scss'
import ContactsForm from './ContactsForm'

import { ContactsProps } from '@/types/blocks.types'

export const Contacts: React.FC<ContactsProps> = ({ title, image }) => {
	return (
		<section className={styles.contacts}>
			<div className={styles.contacts__container}>
				<Heading text={title} isCentered level={'h2'} id={0} className={styles.contacts__heading} />
				<div className={styles.contacts__wrap}>
					<ContactsForm />
					<Fancybox
						className={clsx(styles.contacts__image, '-ibg -ibg_contain')}
						delegate="[data-fancybox]"
					>
						<StrapiImage
							src={image.url}
							alt={image.alternativeText || 'No alternative text provided'}
							fill
							className="text-image__image"
							data-fancybox=""
						/>
					</Fancybox>
				</div>
			</div>
		</section>
	)
}
