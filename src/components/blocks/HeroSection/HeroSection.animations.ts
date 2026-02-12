import { fadeInLeft } from '@/utils/animations'

export const heroAnimations = {
	container: {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.1,
			},
		},
	},
	content: fadeInLeft,
	image: {
		hidden: { opacity: 0, x: 20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.6,
				delay: 0.3,
			},
		},
	},
}
