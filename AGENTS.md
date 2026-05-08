# AGENTS.md

# Project Overview

This project is a premium modern e-commerce frontend for selling motorcycle helmets.

The project focuses on:
- clean architecture
- scalable frontend structure
- reusable UI components
- modern premium user experience

Tech stack:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zustand
- TanStack Query
- React Hook Form
- Zod
- Framer Motion

Frontend-only project.

---

# Mandatory Reading

Before generating code, always follow:
- docs/ui-rules.md
- docs/design-system.md
- docs/frontend-architecture.md
- docs/component-patterns.md
- docs/page-structure.md
- docs/responsive-rules.md
- docs/animation-guidelines.md

These files define mandatory project standards.

---

# Core Engineering Principles

Priorities:
1. Maintainability
2. Scalability
3. Readability
4. Reusability
5. Responsive design
6. UI consistency

Avoid:
- overengineering
- deeply nested components
- duplicated logic
- bloated files

---

# Frontend Rules

- Always use TypeScript
- Always use functional React components
- Prefer Server Components
- Use Client Components only when needed
- Keep components modular
- Extract reusable UI sections
- Use proper typing
- Use async/await
- Use descriptive naming

---

# Styling Rules

- Use Tailwind CSS only
- Use shadcn/ui whenever possible
- Avoid CSS modules
- Avoid styled-components
- Avoid inline styles
- Use utility-first styling

---

# UI Philosophy

The UI should feel:
- premium
- minimal
- modern
- clean
- polished

Inspired by:
- Apple
- Nike
- Vercel
- modern Shopify stores

Avoid:
- outdated admin UI
- overly colorful interfaces
- cluttered layouts

---

# Component Standards

Components should:
- be reusable
- remain small and maintainable
- support responsive behavior
- use proper spacing
- avoid excessive complexity

Avoid:
- giant page components
- duplicated card layouts
- hardcoded repetitive UI

---

# State Management

Use Zustand for:
- cart
- wishlist
- UI state

Do not use Redux.

---

# Data Fetching

Use:
- TanStack Query
- async/await

Avoid:
- direct fetch calls scattered across components

---

# Forms

Use:
- React Hook Form
- Zod validation

---

# Animations

Use Framer Motion.

Animations should:
- feel smooth
- feel subtle
- improve UX
- never distract users

---

# Responsive Design

Always build mobile-first.

Support:
- mobile
- tablet
- desktop

Prioritize:
- readability
- spacing
- touch-friendly UI

---

# Quality Standard

All generated code should:
- be production-ready
- feel visually polished
- follow modern frontend standards
- remain scalable
- maintain consistent design quality