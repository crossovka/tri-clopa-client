'use client'

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
	Reviews,
	Services,
	Trust,
} from './blocks'

import type {
	ContactsProps,
	FaqProps,
	HeadingProps,
	HeroSectionProps,
	ImageBlockProps,
	InfoProps,
	ParagraphProps,
	ParagraphWithImageProps,
	ProcessProps,
	ReviewsProps,
	ServicesProps,
	TrustProps,
} from '@/types/blocks.types'
import type { Block } from '@/types/common.types'

// 💡 Расширяем тип блока, добавляя globalKey и useGlobal
type BlockWithGlobal = Block & {
	useGlobal?: boolean
	globalKey?: string
}

// 🔄 Возвращает объединённый блок, если указан globalKey
function getBlockWithGlobal<T extends BlockWithGlobal>(
	block: T,
	globalBlocks: BlockWithGlobal[],
): T {
	if (block.useGlobal && block.globalKey) {
		const global = globalBlocks.find(
			(g) => g.__component === block.__component && g.globalKey === block.globalKey,
		)
		if (global) {
			return { ...block, ...global }
		}
	}
	return block
}

// 🧱 Рендер одного блока
function blockRenderer(block: BlockWithGlobal, index: number, globalBlocks: BlockWithGlobal[]) {
	const finalBlock = getBlockWithGlobal(block, globalBlocks)
	const uniqueKey = `${finalBlock.__component}-${finalBlock.id || index}`

	switch (finalBlock.__component) {
		case 'blocks.hero-section':
			return <HeroSection {...(finalBlock as HeroSectionProps)} key={uniqueKey} />
		case 'blocks.heading':
			return <Heading {...(finalBlock as HeadingProps)} key={uniqueKey} />
		case 'blocks.paragraph-with-image':
			return <ParagraphWithImage {...(finalBlock as ParagraphWithImageProps)} key={uniqueKey} />
		case 'blocks.paragraph':
			return <Paragraph {...(finalBlock as ParagraphProps)} key={uniqueKey} />
		case 'blocks.contacts':
			return <Contacts {...(finalBlock as ContactsProps)} key={uniqueKey} />
		case 'blocks.info':
			return <Info {...(finalBlock as InfoProps)} key={uniqueKey} />
		case 'blocks.services':
			return <Services {...(finalBlock as ServicesProps)} key={uniqueKey} />
		case 'blocks.trust':
			return <Trust {...(finalBlock as TrustProps)} key={uniqueKey} />
		case 'blocks.process':
			return <Process {...(finalBlock as ProcessProps)} key={uniqueKey} />
		case 'blocks.faq':
			return <Faq {...(finalBlock as FaqProps)} key={uniqueKey} />
		case 'blocks.image':
			return <ImageBlock {...(finalBlock as ImageBlockProps)} key={uniqueKey} />
		case 'blocks.reviews':
			return <Reviews {...(finalBlock as ReviewsProps)} key={uniqueKey} />
		default:
			console.warn(`Неизвестный блок: ${finalBlock.__component}`)
			return null
	}
}

// 📦 Компонент рендеринга всех блоков с поддержкой глобальных
export function BlockRenderer({
	blocks,
	globalBlocks,
}: {
	blocks: Block[]
	globalBlocks: Block[]
}) {
	return <>{blocks.map((block, i) => blockRenderer(block, i, globalBlocks))}</>
}
