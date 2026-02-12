import { fadeInLeft, fadeInRight } from '@/utils/animations'

// Анимации для ParagraphWithImage компонента
export const paragraphWithImageAnimations = {
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
  // Анимация для текста (по умолчанию слева направо)
  text: fadeInLeft,
  // Анимация для изображения (по умолчанию справа налево)
  image: fadeInRight,
  // Анимации для reversed варианта (зеркальные)
  reversed: {
    text: fadeInRight, // В reversed варианте текст появляется справа
    image: fadeInLeft  // В reversed варианте изображение появляется слева
  }
}