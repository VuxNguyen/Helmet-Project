# Frontend Architecture

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui |
| State Management | Zustand |
| Data Fetching | TanStack Query |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Linting | ESLint |

---

## Directory Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/          # Auth layout group
│   ├── (main)/          # Main layout group
│   ├── api/             # API routes (if needed)
│   └── layout.tsx       # Root layout
│
├── components/          # Shared components
│   ├── ui/              # shadcn/ui primitives
│   ├── layout/          # Layout components (Header, Footer, etc.)
│   └── shared/          # Business-agnostic shared components
│
├── features/            # Feature-based modules
│   ├── products/        # Product listing, detail, search
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout flow
│   ├── wishlist/        # Wishlist functionality
│   └── auth/            # Authentication
│
├── hooks/               # Shared custom hooks
│
├── lib/                 # Utilities, helpers, configs
│   ├── utils.ts         # cn() and other utilities
│   ├── api/             # API client & fetch helpers
│   └── constants.ts     # App-wide constants
│
├── stores/              # Zustand stores
│   ├── cart-store.ts
│   ├── wishlist-store.ts
│   └── ui-store.ts
│
├── types/               # Shared TypeScript types/interfaces
│
├── providers/           # React context providers
│
└── styles/              # Global styles
    └── globals.css
```

---

## Layer Responsibilities

### `src/app/`
- Route definitions
- Page components (Server Components by default)
- Layout components for route groups
- Loading, error, and not-found states

### `src/components/`
- **ui/**: shadcn/ui generated primitives (Button, Card, Input, etc.)
- **layout/**: App shell components (Header, Footer, Sidebar, etc.)
- **shared/**: Cross-feature reusable components (ProductCard, Rating, etc.)

### `src/features/`
- Feature-specific components, hooks, and logic
- Each feature is self-contained
- Can import from `components/` and `hooks/`
- Should NOT import from other features directly

### `src/hooks/`
- Shared custom hooks used across features
- Example: `useDebounce`, `useMediaQuery`, `useIntersectionObserver`

### `src/stores/`
- Zustand stores for global state
- Keep stores flat and focused
- Each store has a single responsibility

### `src/lib/`
- Pure utility functions
- API client configuration
- Constants and configuration

---

## Data Flow

```
User Interaction
      ↓
  Client Component (useState/useEffect)
      ↓
  Zustand Store (local state) / TanStack Query (server state)
      ↓
  API Client (lib/api)
      ↓
  Backend / External API
      ↓
  Response → Cache Update → Re-render
```

---

## Server vs Client Components

| Use Server Component | Use Client Component |
|---------------------|---------------------|
| Static content | Interactive UI |
| SEO-critical pages | Forms |
| Data fetching (read-only) | User input handling |
| Layout components | Animations |
| Metadata generation | Browser API access |

---

## State Management Strategy

### Server State (TanStack Query)
- Product listings
- Product details
- User data
- Orders
- Any data fetched from API

### Client State (Zustand)
- Cart items
- Wishlist items
- UI preferences (theme, sidebar state)
- Toast notifications
- Filter/sort selections (temporary)

### Local State (React useState)
- Form input values
- Toggle states
- Component-specific UI state

---

## Performance Guidelines

- Use React.lazy and dynamic imports for heavy components
- Implement proper image optimization with `next/image`
- Use `useMemo` and `useCallback` only when profiling shows benefit
- Avoid prop drilling — prefer composition or Zustand
- Keep bundle size small — tree-shake unused imports
- Use streaming SSR and Suspense boundaries

---

## Error Handling

- Global error boundary at root layout
- Per-page error boundaries for critical sections
- TanStack Query error states for data fetching
- Form validation errors via React Hook Form + Zod
- Graceful degradation for missing data
- Toast notifications for user-facing errors

---

## Testing Strategy

- Unit tests for utilities and hooks (Vitest)
- Component tests for UI components (Testing Library)
- Integration tests for features
- E2E tests for critical flows (Playwright/Cypress) — future

---

## Security

- Validate all forms with Zod
- Sanitize user input
- Use HTTP-only cookies for auth tokens if applicable
- Implement rate limiting on API routes
- Follow Next.js security best practices