# HelmetPro 🏍️

**Premium Motorcycle Helmet E-commerce Frontend**

HelmetPro is a modern, high-performance e-commerce frontend built with **Next.js 16**, **React 19**, and **TypeScript**. It provides a complete shopping experience for premium motorcycle helmets with a beautiful, responsive UI.

## 🚀 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16.2** | React framework with App Router, server components, and streaming |
| **React 19** | UI library with latest features |
| **TypeScript** | Type safety throughout the codebase |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **Zustand** | Lightweight state management (with persist middleware) |
| **Zod** | Schema validation |
| **React Hook Form** | Form management with validation |
| **Radix UI** | Accessible, unstyled UI primitives |
| **NextAuth.js** | Authentication |
| **TanStack React Query** | Server state management |
| **Embla Carousel** | Carousel/slider component |
| **Lucide React** | Icon library |
| **Sonner** | Toast notifications |
| **date-fns** | Date utilities |
| **shadcn/ui** | Component library foundation |

## 📁 Project Structure

```
helmetpro/
├── public/                  # Static assets (images, icons)
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── (account)/       # User account route group
│   │   │   ├── account/     # Dashboard pages
│   │   │   │   ├── addresses/   # Address management
│   │   │   │   ├── orders/      # Order history
│   │   │   │   ├── profile/     # Profile settings
│   │   │   │   ├── wishlist/    # Wishlist
│   │   │   │   └── page.tsx     # Account overview
│   │   │   └── layout.tsx   # Dashboard layout (sidebar nav)
│   │   ├── (auth)/          # Authentication route group
│   │   │   ├── login/       # Login page
│   │   │   └── register/    # Registration page
│   │   ├── (shop)/          # Shop route group
│   │   │   ├── cart/        # Cart page
│   │   │   ├── checkout/    # Checkout page
│   │   │   └── products/    # Product listing & detail pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Shared UI components
│   │   ├── brands/          # Brands showcase section
│   │   ├── categories/      # Categories section
│   │   ├── hero/            # Hero section with trust bar
│   │   ├── layout/          # Navbar, footer, mobile menu, dashboard sidebar, auth guard
│   │   ├── locale-provider/ # i18n context provider
│   │   ├── products/        # Shared product components
│   │   └── ui/              # Base UI components (shadcn)
│   ├── data/                # Static data files
│   │   ├── brands.ts        # Brand data
│   │   ├── categories.ts    # Category data
│   │   ├── products.ts      # Product data
│   │   └── sample-products.ts # Sample product listings
│   ├── features/            # Feature-based modules
│   │   ├── auth/            # Authentication (schemas, login/register forms)
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout flow
│   │   └── products/        # Product listing & detail
│   ├── hooks/               # Global custom hooks
│   │   └── use-translations.ts
│   ├── lib/                 # Utility libraries
│   │   ├── constants.ts     # App-wide constants
│   │   ├── dictionary.ts    # i18n dictionary
│   │   ├── motion.ts        # Framer Motion tokens
│   │   └── utils.ts         # cn() utility
│   └── stores/              # Global Zustand stores
│       ├── auth-store.ts    # Authentication state (persisted)
│       ├── cart-store.ts    # Shopping cart (persisted)
│       ├── locale-store.ts  # Locale/i18n state
│       ├── ui-store.ts      # UI preferences
│       └── wishlist-store.ts # Wishlist (persisted)
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── components.json          # shadcn/ui configuration
└── package.json             # Dependencies & scripts
```

## ✨ Features Implemented

### 🏠 Homepage
- **Hero Section** — Visually engaging hero with CTA
- **Trust Bar** — Social proof & trust indicators
- **Categories Section** — Browse by helmet category
- **Brands Showcase** — Featured helmet brands
- **Featured Products** — Curated product grid

### 🛍️ Product Listing (`/products`)
- **Filter Sidebar** — Multi-criteria filtering (brand, category, price range, etc.)
- **Search Bar** — Real-time product search
- **Sort Dropdown** — Sort by price, name, popularity
- **Mobile Filter Drawer** — Responsive filter UI for mobile devices
- **Pagination** — Page-based navigation
- **Product Grid** — Card-based product display
- **State management** with Zustand filter store
- **Custom hook** `use-product-listing` for data fetching & filtering

### 📄 Product Detail (`/products/[slug]`)
- **Product Gallery** — Image carousel with Embla
- **Product Info** — Title, price, description, specs
- **Product Description** — Detailed product information
- **Product Reviews** — Customer reviews section
- **Related Products** — Cross-sell recommendations
- **Loading UI** with skeleton states

### 🛒 Shopping Cart (`/cart`)
- **Cart Item Row** — Individual item with quantity controls
- **Cart Summary** — Subtotal, shipping, total calculation
- **Empty Cart** — Empty state with CTA to shop
- **Persistent state** via Zustand (survives page refresh)

### 💳 Checkout (`/checkout`)
- **Shipping Form** — Address collection with validation (React Hook Form + Zod)
- **Delivery Options** — Select delivery method
- **Payment Methods** — Payment selection UI
- **Order Summary** — Review before placing order
- **Multi-step form** validation

### 👤 User Account (`/account`)
- **Responsive Dashboard Sidebar** — Collapsible on mobile, sticky on desktop
- **Account Overview** — Stats cards (orders, wishlist, cart) + recent orders
- **Order History** — Searchable list with expandable details & status badges
- **Wishlist** — Product grid with add-to-cart & remove, backed by persisted Zustand store
- **Address Management** — Add/edit/delete addresses, set default, type labels (home/office)
- **Profile Settings** — Avatar, name/email/phone/DOB fields, password change section
- **Auth Guard** — Unauthenticated users redirected to login
- **Demo Account** — One-click quick login that pre-populates wishlist

### 🔐 Authentication (`/login`, `/register`)
- **Login form** — Email/password with Zod validation
- **Registration form** — Full name, email, password with confirm
- **Persisted auth state** — Login survives page refresh via Zustand persist
- **Demo login** — Quick-test button with pre-filled wishlist items

### 🌐 Internationalization (i18n)
- **Vietnamese & English** language support
- **Locale store** (Zustand) for language state
- **Translation hooks** (`use-translations`)
- **Language switcher** in navbar

### 🎨 UI/UX
- **Responsive design** — Mobile-first, works on all screen sizes
- **Dark mode** support via CSS variables
- **Smooth animations** with Framer Motion
- **Toast notifications** via Sonner
- **Loading skeletons** and error states
- **Accessible components** via Radix UI primitives
- **Modern icons** from Lucide React
- **Tailwind CSS v4** with `tw-animate-css`

### 🔧 Architecture Highlights
- **Feature-based folder structure** — Scalable and maintainable
- **Server Components** where possible, Client Components when needed
- **TypeScript** throughout for type safety
- **Zod schemas** for runtime validation
- **State management** split between Zustand (client state, persisted) and React Query (server state)
- **Route groups** for clean URL organization (`(account)`, `(auth)`, `(shop)`)

## 🚦 Getting Started

### Prerequisites
- Node.js 20+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📦 Build & Deploy

```bash
npm run build   # Builds the production application in the .next folder
```

The application is ready to deploy on [Vercel](https://vercel.com) or any platform supporting Next.js.

## 🔜 Planned Features

- Payment gateway integration
- Real-time inventory tracking
- Admin dashboard
- Email notifications for orders

## 📄 License

This project is private and intended for development purposes.
