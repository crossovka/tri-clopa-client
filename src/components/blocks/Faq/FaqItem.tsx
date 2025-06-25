'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import styles from './Faq.module.scss'

export function FaqItem({ title, content }: { title: string; content: string }) {
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
		<li className={styles.item}>
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
		</li>
	)
}
