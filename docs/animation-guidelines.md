# Animation Guidelines

## Philosophy

Animations enhance the user experience by providing feedback, guiding attention, and creating a polished feel. They should be **subtle**, **smooth**, and **purposeful** — never distracting or gimmicky.

---

## Core Principles

1. **Subtlety** — Animations should be barely noticeable. If a user notices the animation over the content, it's too much.
2. **Performance** — Always prefer `transform` and `opacity` animations. These are GPU-accelerated and avoid layout thrashing.
3. **Purpose** — Every animation should serve a function: feedback, orientation, or delight.
4. **Reduced Motion** — Always respect `prefers-reduced-motion`.

---

## Motion Tokens

```typescript
// lib/motion.ts
export const motionTokens = {
  duration: {
    instantaneous: 100,  // micro-interactions, ripple effects
    fast: 150,           // hover states, button presses
    normal: 200,         // transitions, toggles
    slow: 300,           // page transitions, modals
    slower: 500,         // hero animations, large reveals
    slowest: 750,        // background pans, atmospheric
  },
  easing: {
    default: [0.4, 0, 0.2, 1],        // standard material easing
    emphasis: [0.2, 0, 0, 1],         // dramatic deceleration
    accelerate: [0.4, 0, 1, 1],       // things leaving screen
    decelerate: [0, 0, 0.2, 1],       // things entering screen
    spring: { stiffness: 300, damping: 30, mass: 0.5 },
    gentleSpring: { stiffness: 200, damping: 25, mass: 0.5 },
  },
}
```

---

## Framer Motion Patterns

### 1. Fade In (Most Common)
```tsx
import { motion } from 'framer-motion'

export function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
```

### 2. Slide Up (for cards, sections)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-50px' }}
  transition={{ duration: 0.4, ease: 'easeOut' }}
>
  {children}
</motion.div>
```

### 3. Stagger Children (for grids, lists)
```tsx
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
}

<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 4. Scale on Hover (for cards, buttons)
```tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
  {children}
</motion.div>
```

### 5. Page Transitions
```tsx
// Use with Next.js App Router
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

---

## Animation Types & Use Cases

| Type | Duration | Easing | Use Case |
|------|----------|--------|----------|
| Fade | 200-300ms | easeOut | Text, icons, simple reveals |
| Slide | 300-400ms | easeOut | Cards, sections, panels |
| Scale | 150-200ms | spring | Hover effects, buttons |
| Stagger | 50ms delay | easeOut | Grid lists, feature rows |
| Drawer | 300ms | emphasis | Mobile navigation, filters |
| Modal | 200ms | emphasis | Dialog open/close |
| Skeleton | 1.5s loop | linear | Loading states (pulse) |
| Parallax | scroll-based | — | Hero backgrounds (sparingly) |
| Counter | 500ms | easeOut | Numbers, prices |

---

## Performance Rules

1. **Always use `transform` and `opacity`** — never animate `width`, `height`, `top`, `left`, `margin`, or `padding`.
2. **Use `will-change` sparingly** — only for elements that will animate, and remove after animation completes.
3. **Prefer CSS transitions** for simple hover/focus states (no Framer Motion overhead).
4. **Avoid animating 100+ elements** — use staggered children sparingly.
5. **Profile on mobile devices** — lower-end devices should still feel smooth.

```tsx
// ✅ Good — animates transform/opacity
<motion.div animate={{ opacity: 1, scale: 1 }} />

// ❌ Bad — animates layout properties
<motion.div animate={{ width: '100%', height: 300 }} />
```

---

## Reduced Motion

```tsx
'use client'

import { useReducedMotion } from 'framer-motion'

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  )
}
```

For CSS-based reduced motion:
```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Specific Component Animations

### Button Press
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
>
  Add to Cart
</motion.button>
```

### Product Card Hover
```tsx
<motion.div
  className="group relative"
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
>
  {/* Quick add button appears on hover */}
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    className="absolute bottom-4 left-4 right-4"
  >
    <Button className="w-full">Quick Add</Button>
  </motion.div>
</motion.div>
```

### Skeleton Loading
```tsx
<div className="animate-pulse space-y-4">
  <div className="h-48 bg-muted rounded-lg" />
  <div className="h-4 bg-muted rounded w-3/4" />
  <div className="h-4 bg-muted rounded w-1/2" />
</div>
```

### Counter/Number Animation
```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

export function AnimatedNumber({ value }: { value: number }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 })
  const display = useTransform(spring, (v) => Math.round(v))

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}
```

---

## Exit Animations

Always animate elements leaving the DOM:

```tsx
<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.div>
  )}
</AnimatePresence>
```

---

## What to Avoid

- ❌ Bouncing or elastic animations (cheap feeling)
- ❌ Duration longer than 500ms for UI elements
- ❌ Animating every element on the page
- ❌ Rotating or 3D transforms (unless specifically needed)
- ❌ Autoplaying carousels
- ❌ Sequenced animations that delay user interaction
- ❌ Animations on elements above the fold that delay LCP

---

## Checklist

- [ ] Animation has a clear purpose
- [ ] Duration is within acceptable range (100-500ms)
- [ ] Uses `transform`/`opacity` only
- [ ] Respects `prefers-reduced-motion`
- [ ] Works on mobile without jank
- [ ] Exit animation included for disappearing elements
- [ ] No animation on critical above-the-fold content
- [ ] Tested with Framer Motion dev tools