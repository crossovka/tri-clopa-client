/**
 * Конфигурация анимаций для Framer Motion
 * Общие настройки для повторного использования в проекте
 */

// Базовые варианты анимаций для появления элементов
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
};

// Анимация для появления с задержкой (stagger children)
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Настройки transition по умолчанию
export const defaultTransition = {
  duration: 0.6
};


// Viewport настройки для триггера анимаций
export const viewportSettings = {
  once: true, // Анимация срабатывает только один раз
  amount: 0.2, // Элемент должен быть виден на 20% для запуска
  margin: "-50px 0px -50px 0px" // Отступы для триггера
};

// Специальные настройки viewport для Paragraph (запускается раньше)
export const paragraphViewportSettings = {
  once: true,
  amount: 0.01, // Элемент должен быть виден всего на 10% для запуска
  margin: "-100px 0px -100px 0px" // Большие отступы для более раннего триггера
};
