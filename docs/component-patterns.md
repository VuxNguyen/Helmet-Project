# Component Patterns

## Overview

This document defines the standard patterns for building React components in this project. All components must follow these conventions to ensure consistency, reusability, and maintainability.

---

## Component Types

### 1. Server Components (Default)
```tsx
// ProductList.tsx — Server Component
import { ProductCard } from '@/components/shared/product-card'

interface ProductListProps {
  category: string
}

export async function ProductList({ category }: ProductListProps) {
  const products = await getProductsByCategory(category)

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
```

- Default to Server Components
- Fetch data directly with `async/await`
- No hooks, no event handlers, no browser APIs
- Import Client Components for interactive parts

### 2. Client Components
```tsx
'use client'

// AddToCartButton.tsx — Client Component
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart-store'

interface AddToCartButtonProps {
  productId: string
  variant?: 'default' | 'icon'
}

export function AddToCartButton({ productId, variant = 'default' }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleClick = async () => {
    setIsAdding(true)
    await addItem(productId)
    setIsAdding(false)
  }

  return (
    <Button onClick={handleClick} disabled={isAdding}>
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
}
```

- Add `'use client'` directive at top
- Keep client logic minimal
- Push data fetching up to Server Components when possible

### 3. Compound Components
```tsx
// ProductCard.tsx
'use client'

import { createContext, useContext } from 'react'
import { Card } from '@/components/ui/card'

interface ProductContextType {
  product: Product
  onAddToCart?: (id: string) => void
}

const ProductContext = createContext<ProductContextType | null>(null)

function useProduct() {
  const context = useContext(ProductContext)
  if (!context) throw new Error('useProduct must be used within ProductCard')
  return context
}

// Main component
function ProductCardRoot({ product, onAddToCart, children }: ProductCardProps) {
  return (
    <ProductContext.Provider value={{ product, onAddToCart }}>
      <Card className="group overflow-hidden">{children}</Card>
    </ProductContext.Provider>
  )
}

// Sub-components
function ProductImage() {
  const { product } = useProduct()
  return <Image src={product.image} alt={product.name} />
}

function ProductName() {
  const { product } = useProduct()
  return <h3 className="font-semibold">{product.name}</h3>
}

function ProductPrice() {
  const { product } = useProduct()
  return <span className="text-lg font-bold">${product.price}</span>
}

// Attach sub-components
export const ProductCard = Object.assign(ProductCardRoot, {
  Image: ProductImage,
  Name: ProductName,
  Price: ProductPrice,
})
```

### 4. Polymorphic Components
```tsx
// Text.tsx
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

const textVariants = cva('', {
  variants: {
    size: {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'normal',
  },
})

interface TextProps extends VariantProps<typeof textVariants> {
  asChild?: boolean
  children: React.ReactNode
}

export function Text({ asChild = false, size, weight, children }: TextProps) {
  const Comp = asChild ? Slot : 'p'
  return <Comp className={textVariants({ size, weight })}>{children}</Comp>
}
```

---

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Component file | PascalCase | `ProductCard.tsx` |
| Component function | PascalCase | `function ProductCard()` |
| Props interface | PascalCase + Props | `ProductCardProps` |
| Event handlers | `handle` + Action | `handleSubmit`, `handleClick` |
| Custom hooks | `use` + Name | `useDebounce`, `useMediaQuery` |
| Utility functions | camelCase | `formatPrice`, `cn` |

---

## Props Patterns

### 1. Destructure with defaults
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  children,
}: ButtonProps) {
  // ...
}
```

### 2. Forward refs for form elements
```tsx
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div>
        <label>{label}</label>
        <input ref={ref} className={cn('input', className)} {...props} />
        {error && <p className="text-destructive text-sm">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
```

### 3. Spread remaining props
```tsx
interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className, ...props }: CardProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('card', className)} {...props}>
      {children}
    </div>
  )
}
```

---

## Composition Patterns

### Extract Logic into Hooks
```tsx
// hooks/use-product-list.ts
export function useProductList(category: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => getProducts(category),
  })

  return { products: data, isLoading, error }
}

// Usage in component
function ProductPage({ category }: { category: string }) {
  const { products, isLoading, error } = useProductList(category)

  if (isLoading) return <ProductSkeleton />
  if (error) return <ErrorState />
  return <ProductList products={products} />
}
```

### Separate Presentational vs Container Components
```tsx
// Container — handles data/state logic
function ProductPageContainer() {
  const { data } = useQuery(...)
  return <ProductPageView products={data} onAddToCart={handleAdd} />
}

// Presentational — renders UI, receives props
function ProductPageView({ products, onAddToCart }: ProductPageViewProps) {
  return products.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)
}
```

---

## File Organization

### Single Component
```
ProductCard/
├── ProductCard.tsx        # Main component
├── ProductCard.test.tsx   # Tests
└── index.ts               # Re-export
```

### Feature Module
```
features/products/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── ProductFilters.tsx
├── hooks/
│   ├── use-products.ts
│   └── use-product-filters.ts
├── types/
│   └── product.ts
├── utils/
│   └── product-helpers.ts
└── index.ts
```

---

## Error & Loading States

### Every data-fetching component must handle:
```tsx
function ProductDetail({ id }: { id: string }) {
  const { data, isLoading, error } = useProduct(id)

  if (isLoading) return <ProductDetailSkeleton />
  if (error) return <ErrorState message={error.message} onRetry={() => refetch()} />
  if (!data) return <NotFoundState />

  return <ProductDetailView product={data} />
}
```

---

## Conditional Rendering

- Use early returns for loading/error/empty states
- Use ternary for simple conditional content
- Avoid `&&` when falsy values could render as `0` or empty string
- Extract complex conditionals into variables

```tsx
// ✅ Good
if (!products.length) return <EmptyState />

// ✅ Good
{isLoggedIn ? <UserMenu /> : <LoginButton />}

// ❌ Avoid
{products.length && <ProductList />}

// ✅ Better
{products.length > 0 && <ProductList />}
```

---

## What to Avoid

- ❌ Giant components (>200 lines)
- ❌ Nested ternary expressions
- ❌ Props drilling beyond 3 levels
- ❌ Mutating props directly
- ❌ Components with multiple unrelated responsibilities
- ❌ Direct DOM manipulation (use refs instead)
- ❌ Synchronous setState in render