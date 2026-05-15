# HelmetPro

**Premium Motorcycle Helmet E-commerce — Full-Stack Application**

HelmetPro is a full-stack e-commerce platform built with **Next.js 16** (App Router), **React 19**, and **TypeScript**. The backend uses **Next.js API Routes** with **JSON file persistence** for data storage — no external database required. It provides a complete shopping experience for premium motorcycle helmets with a beautiful, responsive UI and a full admin dashboard.

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16.2** | React framework with App Router, server components, streaming |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Zustand** | Client state management (persisted to localStorage) |
| **TanStack React Query** | Server state management (data fetching, mutations) |
| **React Hook Form + Zod** | Form management & validation |
| **Radix UI** | Accessible UI primitives |
| **shadcn/ui** | Component library foundation |
| **TanStack Table** | Data tables (admin) |
| **Embla Carousel** | Image carousels |
| **Lucide React** | Icons |
| **Sonner** | Toast notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| **Next.js API Routes** | REST API endpoints (28 routes) |
| **JSON File Persistence** | Data stored in `src/data/db/*.json` (7 files) |
| **`json-db` helper** | Sync CRUD operations via Node.js `fs` |

## Project Structure

```
helmetpro/
├── public/                       # Static assets
├── src/
│   ├── app/
│   │   ├── (account)/account/    # User dashboard (orders, wishlist, addresses, profile)
│   │   ├── (admin)/admin/        # Admin dashboard (products, orders, customers, settings)
│   │   ├── (auth)/               # Login & register pages
│   │   ├── (shop)/               # Cart, checkout, product listing & detail
│   │   ├── api/                  # 28 REST API routes
│   │   │   ├── auth/             # POST register, login, logout
│   │   │   ├── products/         # GET list, featured, detail
│   │   │   ├── cart/             # GET, POST, PATCH, DELETE
│   │   │   ├── checkout/         # POST create order
│   │   │   ├── orders/           # GET list, detail
│   │   │   ├── wishlist/         # GET, POST, DELETE
│   │   │   ├── addresses/        # GET, POST, PUT, DELETE, PATCH default
│   │   │   ├── shipping-methods/ # GET
│   │   │   ├── states/           # GET
│   │   │   └── admin/            # Stats, products CRUD, orders, customers
│   │   ├── layout.tsx
│   │   └── page.tsx              # Homepage (featured products from API)
│   ├── components/               # Shared UI components (shadcn/ui, layout, products)
│   ├── data/
│   │   ├── db/                   # JSON database files (7 files)
│   │   │   ├── users.json
│   │   │   ├── products.json
│   │   │   ├── orders.json
│   │   │   ├── customers.json
│   │   │   ├── addresses.json
│   │   │   ├── cart.json
│   │   │   └── wishlist.json
│   │   ├── brands.ts
│   │   ├── categories.ts
│   │   └── sample-products.ts
│   ├── features/                 # Feature modules with API layer
│   │   ├── admin/                # Dashboard + CRUD (products, orders, customers)
│   │   ├── addresses/            # API client + auth sync hook
│   │   ├── auth/                 # Login/register forms + React Query mutations
│   │   ├── cart/                 # Zustand store + API sync
│   │   ├── checkout/             # Multi-step form + API submit
│   │   ├── orders/               # API client for order history
│   │   ├── products/             # Listing, detail, API client
│   │   └── wishlist/             # Zustand store + API sync
│   ├── hooks/
│   ├── lib/
│   │   ├── json-db.ts            # Sync CRUD helper for JSON files
│   │   ├── dictionary.ts         # i18n (vi/en)
│   │   └── utils.ts              # cn()
│   └── stores/                   # Zustand stores (persisted)
│       ├── auth-store.ts
│       ├── cart-store.ts
│       ├── wishlist-store.ts
│       ├── addresses-store.ts
│       └── locale-store.ts
├── docs/                         # Documentation
│   ├── backend-api.md
│   ├── backend-integration-guide.md
│   ├── architecture.md
│   ├── data-models.md
│   └── i18n.md
├── next.config.ts
└── package.json
```

## Features

### Backend API (28 Routes)
- **Auth** — Register, login, logout with JSON persistence
- **Products** — List (with filters, pagination), featured, detail by slug
- **Cart** — Full CRUD: list, add item, update quantity, remove item
- **Checkout** — Create order from cart
- **Orders** — List by user, detail by ID
- **Wishlist** — List, add item, remove item
- **Addresses** — Full CRUD + set default
- **Admin** — Stats, products CRUD, orders (status update), customers list/detail
- **Shipping Methods & States** — Lookup endpoints

### Frontend
- **Homepage** — Hero, trust bar, categories, brands showcase, featured products from API
- **Product Listing** — Filter sidebar, search, sort, pagination, mobile drawer
- **Product Detail** — Image carousel, specs, reviews, related products, loading skeletons
- **Shopping Cart** — Persistent Zustand store synced with API when authenticated
- **Checkout** — Multi-step form with shipping, delivery, payment, order summary
- **User Account** — Orders, wishlist, address management, profile settings
- **Admin Dashboard** — Overview stats, products CRUD, orders management, customers
- **Authentication** — Login/register with persisted session, demo login
- **i18n** — Vietnamese & English with language switcher

### Architecture
- **Feature-based folder structure** with dedicated API layer per feature
- **Local-first + API sync pattern**: Zustand is UI source of truth; when authenticated, mutations also fire API calls
- **Server Components** by default, Client Components only when needed
- **TanStack React Query** for server state, **Zustand** for client state (persisted to localStorage)
- **JSON file persistence** via `src/lib/json-db.ts` — zero external dependencies

## Getting Started

### Prerequisites
- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Start development server (API + frontend)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Customer | `user@helmetpro.com` | `password123` |
| Admin | `admin@helmetpro.com` | `admin123` |

### API Endpoints

All API routes are at `/api/*` and backed by JSON files in `src/data/db/`. See `docs/backend-integration-guide.md` for the full specification.

## Planned Features

- Database upgrade (SQLite / PostgreSQL)
- Password hashing with bcrypt
- JWT / NextAuth.js authentication
- Input validation with Zod on backend
- Payment gateway integration

## License

This project is private and intended for development purposes.
