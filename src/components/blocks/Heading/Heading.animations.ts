import { fadeInUp } from '@/utils/animations'

export const headingAnimations = {
    container: fadeInUp,
    // Можно добавить дополнительные варианты анимаций для разных уровней заголовков
    h1: {
        ...fadeInUp,
        visible: {
            ...fadeInUp.visible,
            transition: {
                ...fadeInUp.visible.transition,
                duration: 0.8 // Более длительная анимация для h1
            }
        }
    },
    h2: {
        ...fadeInUp,
        visible: {
            ...fadeInUp.visible,
            transition: {
                ...fadeInUp.visible.transition,
                duration: 0.7
            }
        }
    },
    h3: fadeInUp,
    h4: fadeInUp,
    h5: fadeInUp,
    h6: fadeInUp
} as const

// Вспомогательная функция для получения анимации по уровню
export function getHeadingAnimation(level?: HeadingProps['level']) {
    if (!level) return headingAnimations.container
    return headingAnimations[level] || headingAnimations.container
}

// Тип для импорта
import type { HeadingProps } from '@/types/blocks.types'
