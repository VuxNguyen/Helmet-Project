'use client'

import { useState, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { motionTokens } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "@/hooks/use-translations"
import { useCartStore } from "@/stores/cart-store"
import type { ProductDetail, ProductColor, ProductSize } from "../types/product-detail"

/* ───────── Types ───────── */

interface ProductInfoProps {
  product: ProductDetail
  className?: string
}

/* ───────── Helpers ───────── */

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  const { t } = useTranslations()
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  return (
    <div className="flex items-center gap-0.5" aria-label={t("products_ext.reviews_section.ratingAria").replace("{{rating}}", String(rating))}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill =
          i < fullStars
            ? "fill-amber-400 text-amber-400"
            : i === fullStars && hasHalf
              ? "fill-amber-400/50 text-amber-400"
              : "fill-muted-foreground/20 text-muted-foreground/20"

        return <Star key={i} size={size} className={cn("stroke-none", fill)} />
      })}
    </div>
  )
}

/* ───────── Sub-Components ───────── */

function ColorSelector({
  colors,
  selected,
  onChange,
}: {
  colors: ProductColor[]
  selected: string
  onChange: (hex: string) => void
}) {
  const { t } = useTranslations()
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground">
        {t("products_ext.color")} <span className="text-muted-foreground font-normal">{colors.find((c) => c.hex === selected)?.name}</span>
      </h3>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {colors.map((color) => (
          <button
            key={color.hex}
            type="button"
            onClick={() => onChange(color.hex)}
            aria-label={`Select ${color.name}`}
            aria-pressed={selected === color.hex}
            className={cn(
              "relative flex size-9 items-center justify-center rounded-full transition-all duration-200",
              "ring-1 ring-offset-2 ring-offset-background hover:scale-110",
              selected === color.hex
                ? "ring-foreground scale-110"
                : "ring-border hover:ring-foreground/40",
            )}
            style={{ backgroundColor: color.hex }}
          >
            {selected === color.hex && (
              <Check
                size={14}
                className={cn(
                  "drop-shadow-sm",
                  color.hex === "#F5F5F5" || color.hex === "#E8E8E8"
                    ? "text-foreground"
                    : "text-white",
                )}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function SizeSelector({
  sizes,
  selected,
  onChange,
}: {
  sizes: ProductSize[]
  selected: string
  onChange: (label: string) => void
}) {
  const { t } = useTranslations()
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">{t("products_ext.size")}</h3>
        <button
          type="button"
          className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
        >
          {t("products_ext.sizeGuide")}
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-2">
        {sizes.map((size) => (
          <button
            key={size.label}
            type="button"
            onClick={() => size.inStock && onChange(size.label)}
            disabled={!size.inStock}
            aria-label={`${t("products_ext.size")} ${size.label}${!size.inStock ? ` - ${t("products.outOfStock")}` : ""}`}
            aria-pressed={selected === size.label}
            className={cn(
              "flex h-10 items-center justify-center rounded-lg border text-sm font-medium transition-all duration-200",
              !size.inStock && "cursor-not-allowed opacity-30 line-through",
              selected === size.label && size.inStock
                ? "border-foreground bg-foreground text-background"
                : size.inStock
                  ? "border-border hover:border-foreground/40 hover:bg-accent"
                  : "border-border/50",
            )}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ───────── Main Component ───────── */

export function ProductInfo({ product, className }: ProductInfoProps) {
  const { t } = useTranslations()
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.hex ?? "")
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => s.inStock)?.label ?? "",
  )
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = useCallback(() => {
    setIsAddingToCart(true)
    addItem({
      id: `${product.id}-${selectedColor}-${selectedSize}`,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "/placeholder-helmet.svg",
      slug: product.slug,
      variant: `${selectedColor ? `${product.colors.find((c) => c.hex === selectedColor)?.name} / ` : ""}${selectedSize}`,
    })
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 1000)
  }, [product, selectedColor, selectedSize, addItem])

  const handleToggleWishlist = useCallback(() => {
    setIsWishlisted((prev) => !prev)
  }, [])

  const discountedPrice = product.originalPrice
    ? product.originalPrice
    : product.price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionTokens.duration.slow / 1000,
        ease: motionTokens.easing.decelerate,
      }}
      className={cn("flex flex-col gap-8", className)}
    >
      {/* ── Breadcrumb ── */}
      <nav aria-label={t("products_ext.tabs.ariaLabel")} className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground transition-colors">
          {t("nav.home")}
        </Link>
        <span aria-hidden="true">/</span>
        <Link href="/products" className="hover:text-foreground transition-colors">
          {t("nav.shop")}
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/products?category=${product.categorySlug}`}
          className="hover:text-foreground transition-colors"
        >
          {product.category}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground font-medium truncate max-w-[160px]">
          {product.name}
        </span>
      </nav>

      {/* ── Brand & Title ── */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {product.brand}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {product.name}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
      </div>

      {/* ── Rating ── */}
      <div className="flex items-center gap-3">
        <StarRating rating={product.rating} size={16} />
        <span className="text-sm font-medium text-foreground">{product.rating}</span>
        <span className="text-sm text-muted-foreground">
          {t("products_ext.reviewCount").replace("{{count}}", String(product.reviewCount))}
        </span>
      </div>

      {/* ── Pricing ── */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold tracking-tight text-foreground">
          {formatPrice(product.price)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
            <Badge variant="destructive" className="rounded-md px-2 py-0.5 text-xs font-semibold">
              {t("products_ext.savePercent").replace("{{percent}}", String(product.discount))}
            </Badge>
          </>
        )}
      </div>

      {/* Savings callout */}
      {product.originalPrice && (
        <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 dark:border-green-900 dark:bg-green-950/30">
          <p className="text-sm font-medium text-green-800 dark:text-green-300">
            {t("products_ext.youSave").replace("{{amount}}", String(discountedPrice - product.price))}
          </p>
        </div>
      )}

      {/* ── Color Selection ── */}
      {product.colors.length > 0 && (
        <ColorSelector
          colors={product.colors}
          selected={selectedColor}
          onChange={setSelectedColor}
        />
      )}

      {/* ── Size Selection ── */}
      {product.sizes.length > 0 && (
        <SizeSelector
          sizes={product.sizes}
          selected={selectedSize}
          onChange={setSelectedSize}
        />
      )}

      {/* ── Quantity ── */}
      <div>
        <h3 className="text-sm font-medium text-foreground">{t("products_ext.quantity")}</h3>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-border">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label={t("cart.decreaseQtyAria")}
              className="flex size-10 items-center justify-center text-foreground transition-colors hover:bg-accent disabled:opacity-30"
            >
              <span className="text-lg leading-none">−</span>
            </button>
            <span className="flex w-12 items-center justify-center text-sm font-medium text-foreground">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.min(product.stockCount, q + 1))}
              disabled={quantity >= product.stockCount}
              aria-label={t("cart.increaseQtyAria")}
              className="flex size-10 items-center justify-center text-foreground transition-colors hover:bg-accent disabled:opacity-30"
            >
              <span className="text-lg leading-none">+</span>
            </button>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.stockCount} {t("products.inStock")}
          </span>
        </div>
      </div>

      {/* ── Add to Cart / Wishlist ── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="flex-1 gap-2 text-base"
          onClick={handleAddToCart}
          disabled={!product.inStock || isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
              {t("products.adding")}
            </>
          ) : (
            <>
              <ShoppingBag size={18} />
              {product.inStock ? t("products.addToCart") : t("products.outOfStock")}
            </>
          )}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? t("products.removeFromWishlist") : t("products.addToWishlist")}
          className={cn(
            "gap-2",
            isWishlisted &&
              "border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400",
          )}
        >
          <Heart
            size={18}
            className={cn(
              isWishlisted && "fill-red-500 text-red-500 dark:fill-red-400 dark:text-red-400",
            )}
          />
          {isWishlisted ? t("products_ext.wishlisted") : t("nav.wishlist")}
        </Button>
      </div>

      {/* ── Trust badges ── */}
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/5">
            <Truck size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{t("trust.freeShipping")}</p>
            <p className="text-xs text-muted-foreground">{t("trust.freeShippingDesc")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/5">
            <RotateCcw size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{t("trust.returns")}</p>
            <p className="text-xs text-muted-foreground">{t("trust.returnsDesc")}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/5">
            <ShieldCheck size={18} className="text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{t("trust_ext.twoYearWarranty")}</p>
            <p className="text-xs text-muted-foreground">{t("trust_ext.manufacturerGuarantee")}</p>
          </div>
        </div>
      </div>

      {/* ── SKU ── */}
      <p className="text-xs text-muted-foreground">
        SKU: <span className="font-mono">{product.sku}</span>
      </p>
    </motion.div>
  )
}