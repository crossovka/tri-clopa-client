import {
	Contacts,
	Faq,
	Heading,
	HeroSection,
	ImageBlock,
	Info,
	Paragraph,
	ParagraphWithImage,
	Process,
	Services,
	Trust,
} from './blocks'

import type {
	Block,
	ContactsProps,
	FaqProps,
	HeadingProps,
	HeroSectionProps,
	ImageBlockProps,
	InfoProps,
	ParagraphProps,
	ParagraphWithImageProps,
	ProcessProps,
	ServicesProps,
	TrustProps,
} from '@/types/types'

function blockRenderer(block: Block, index: number) {
	const uniqueKey = `${block.__component}-${block.id || index}` // Безопасный ключ

	switch (block.__component) {
		case 'blocks.hero-section':
			return <HeroSection {...(block as HeroSectionProps)} key={uniqueKey} />
		case 'blocks.heading':
			return <Heading {...(block as HeadingProps)} key={uniqueKey} />
		case 'blocks.paragraph-with-image':
			return <ParagraphWithImage {...(block as ParagraphWithImageProps)} key={uniqueKey} />
		case 'blocks.paragraph':
			return <Paragraph {...(block as ParagraphProps)} key={uniqueKey} />
		case 'blocks.contacts':
			return <Contacts {...(block as ContactsProps)} key={uniqueKey} />
		case 'blocks.info':
			return <Info {...(block as InfoProps)} key={uniqueKey} />
		case 'blocks.services':
			return <Services {...(block as ServicesProps)} key={uniqueKey} />
		case 'blocks.trust':
			return <Trust {...(block as TrustProps)} key={uniqueKey} />
		case 'blocks.process':
			return <Process {...(block as ProcessProps)} key={uniqueKey} />
		case 'blocks.faq':
			return <Faq {...(block as FaqProps)} key={uniqueKey} />
		case 'blocks.image':
			return <ImageBlock {...(block as ImageBlockProps)} key={uniqueKey} />
		default:
			console.warn(`Неизвестный блок: ${block.__component}`)
			return null
	}
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
	return <>{blocks.map(blockRenderer)}</>
}
