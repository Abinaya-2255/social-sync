// Handcrafted luxury motion presets for Social Sync
// Inspired by Apple, Linear, Raycast, Notion, Framer, and Stripe

export const EASING = {
  easeOut: [0.16, 1, 0.3, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  springSoft: { type: 'spring', stiffness: 300, damping: 30 },
}

// Entire page / hero initial load
export const pageReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: EASING.easeOut,
  },
})

// Container for staggering child elements naturally
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
  whileInView: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
  viewport: { once: true },
})

// Child element inside a staggered container
export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASING.easeOut } },
}

// Major section reveal (reveals only once without bouncing)
export const sectionReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-60px' },
  transition: {
    duration: 0.65,
    delay,
    ease: EASING.easeOut,
  },
})

// Premium Card Hover preset
export const cardHover = {
  whileHover: {
    scale: 1.015,
    y: -2,
    transition: { duration: 0.25, ease: EASING.easeOut },
  },
}

// Button micro-interactions
export const buttonMotion = {
  whileHover: { y: -1.5, scale: 1.01, transition: { duration: 0.15, ease: EASING.easeOut } },
  whileTap: { scale: 0.98, transition: { duration: 0.1 } },
}

// Subtle icon hover
export const iconHover = {
  whileHover: { rotate: 6, scale: 1.1, transition: { duration: 0.2, ease: EASING.easeOut } },
}
