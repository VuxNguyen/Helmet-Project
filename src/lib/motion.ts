/**
 * Motion design tokens for Framer Motion animations.
 * Based on animation-guidelines.md specifications.
 */

export const motionTokens = {
  duration: {
    instantaneous: 100, // micro-interactions, ripple effects
    fast: 150, // hover states, button presses
    normal: 200, // transitions, toggles
    slow: 300, // page transitions, modals
    slower: 500, // hero animations, large reveals
    slowest: 750, // background pans, atmospheric
  },
  easing: {
    default: [0.4, 0, 0.2, 1] as const, // standard material easing
    emphasis: [0.2, 0, 0, 1] as const, // dramatic deceleration
    accelerate: [0.4, 0, 1, 1] as const, // things leaving screen
    decelerate: [0, 0, 0.2, 1] as const, // things entering screen
    spring: { stiffness: 300, damping: 30, mass: 0.5 },
    gentleSpring: { stiffness: 200, damping: 25, mass: 0.5 },
  },
} as const;

export type MotionDuration = keyof typeof motionTokens.duration;
export type MotionEasing = keyof typeof motionTokens.easing;

/**
 * Reusable Framer Motion animation variants.
 */

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: motionTokens.duration.normal / 1000,
      ease: motionTokens.easing.default,
    },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.slow / 1000,
      ease: motionTokens.easing.decelerate,
    },
  },
};

export const slideUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.slow / 1000,
      ease: motionTokens.easing.decelerate,
    },
  },
  viewport: { once: true, margin: "-50px" },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.normal / 1000,
      ease: motionTokens.easing.decelerate,
    },
  },
};

export const scaleOnHover = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 300, damping: 20 },
};

export const pageTransition = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: motionTokens.duration.normal / 1000,
    ease: motionTokens.easing.default,
  },
};