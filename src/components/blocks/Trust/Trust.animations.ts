// Анимации для Trust компонента
export const trustAnimations = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    },
    // Анимация для элементов в grid (чередование слева/справа для четных/нечетных)
    item: (index: number) => ({
        hidden: index % 2 === 0
            ? { opacity: 0, x: -30, scale: 0.95 } // Четные элементы слева
            : { opacity: 0, x: 30, scale: 0.95 }, // Нечетные элементы справа
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.05 // Небольшая дополнительная задержка для создания волны
            }
        }
    }),
    // Альтернативная анимация - все элементы снизу
    itemAlt: {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    },
    // Анимация для чисел
    number: {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4
            }
        }
    },
    // Анимация для текста
    text: {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: 0.1 // Задержка после числа
            }
        }
    }
}