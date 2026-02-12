'use client'

import { motion } from 'framer-motion'

import { useLayoutEffect, useRef, useState } from 'react'

import styles from './Faq.module.scss'

interface FaqItemProps {
	title: string
	content: string
	variants?: any
}

export function FaqItem({ title, content, variants }: FaqItemProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [height, setHeight] = useState('0px')
	const contentRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (isOpen && contentRef.current) {
			setHeight(`${contentRef.current.scrollHeight}px`)
		} else {
			setHeight('0px')
		}
	}, [isOpen])

	return (
		<motion.li className={styles.item} variants={variants}>
			<div className={`${styles.spoiler} ${isOpen ? styles.open : ''}`}>
				<div className={styles.summary} onClick={() => setIsOpen(!isOpen)}>
					<span className={styles.question}>{title}</span>
					<span className={styles.icon} />
				</div>
				<div
					ref={contentRef}
					className={styles.answer}
					style={{
						maxHeight: height,
						overflow: 'hidden',
						transition: 'max-height 0.4s ease',
					}}
				>
					{content}
				</div>
			</div>
		</motion.li>
	)
}
