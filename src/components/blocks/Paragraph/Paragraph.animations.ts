// Анимация для Paragraph - более мягкая, подходит для длинного текста
export const paragraphAnimations = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8 // Более длительная анимация для плавности
            }
        }
    },
    // Альтернативная анимация с небольшим смещением для коротких параграфов
    fadeInUpSoft: {
        hidden: { opacity: 0, y: 10 }, // Меньшее смещение для длинного текста
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7
            }
        }
    },
    // Анимация для появления текста с задержкой по строкам (если нужно анимировать отдельные элементы)
    staggerText: {
        container: {
            hidden: { opacity: 0 },
            visible: {
                opacity: 1,
                transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.1
                }
            }
        },
        item: {
            hidden: { opacity: 0, y: 5 },
            visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4 }
            }
        }
    }
}
