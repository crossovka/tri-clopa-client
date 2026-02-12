'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { Fancybox, StrapiImage } from '@/components/ui'
import { viewportSettings } from '@/utils/animations'
import { contactsAnimations } from './Contacts.animations'
import { Heading } from '../Heading'
import styles from './Contacts.module.scss'
import formStyles from './ContactsForm.module.scss'
import ContactsForm from './ContactsForm'

import { ContactsProps } from '@/types/blocks.types'

// Создаем motion версию Fancybox
const MotionFancybox = motion(Fancybox)

export const Contacts: React.FC<ContactsProps> = ({ title, image }) => {
	return (
		<motion.section 
			className={styles.contacts}
			initial="hidden"
			whileInView="visible"
			viewport={viewportSettings}
			variants={contactsAnimations.container}
		>
			<div className={styles.contacts__container}>
				<motion.div
					variants={contactsAnimations.heading}
					className={styles.contacts__heading}
				>
					<Heading text={title} isCentered level={'h2'} id={0} className={styles.contacts__heading} />
				</motion.div>
				<div className={styles.contacts__wrap}>
					<motion.div
						variants={contactsAnimations.form}
						className={formStyles.form}
					>
						<ContactsForm />
					</motion.div>
					<MotionFancybox
						className={clsx(styles.contacts__image, '-ibg -ibg_contain')}
						delegate="[data-fancybox]"
						variants={contactsAnimations.image}
					>
						<StrapiImage
							src={image.url}
							alt={image.alternativeText || 'No alternative text provided'}
							fill
							className="text-image__image"
							data-fancybox=""
						/>
					</MotionFancybox>
				</div>
			</div>
		</motion.section>
	)
}
