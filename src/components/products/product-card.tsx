'use client'

import { useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star } from "lucide-react"

import { type Product } from "@/data/products"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motionTokens } from "@/lib/motion"
import { useTranslations } from "@/hooks/use-translations"

/* ───────── Type ───────── */

interface ProductCardProps {
  product: Product
  index?: number
  className?: string
  onAddToCart?: (product: Product) => void
  onToggleWishlist?: (product: Product) => void
  isWishlisted?: boolean
}

/* ───────── Helpers ───────── */

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
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

/* ───────── Component ───────── */

export function ProductCard({
  product,
  index = 0,
  className,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
}: ProductCardProps) {
  const { t } = useTranslations()
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()

      if (onAddToCart) {
        setIsAddingToCart(true)
        onAddToCart(product)
        // Brief feedback state
        setTimeout(() => setIsAddingToCart(false), 800)
      }
    },
    [product, onAddToCart],
  )

  const handleToggleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onToggleWishlist?.(product)
    },
    [product, onToggleWishlist],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: motionTokens.duration.slow / 1000,
        ease: motionTokens.easing.decelerate,
        delay: index * 0.06,
      }}
      className={cn("group/card", className)}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block"
        aria-label={`View ${product.name}`}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 will-change-transform hover:shadow-lg hover:dark:border-border/80"
        >
          {/* ── Image container ── */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {/* Skeleton placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-muted" />
            )}

            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={cn(
                "object-cover transition-all duration-500 ease-out",
                imageLoaded ? "opacity-100" : "opacity-0",
                isHovered && "scale-105",
              )}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Overlay on hover */}
            <div
              className={cn(
                "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300",
                isHovered && "opacity-100",
              )}
            />

            {/* ── Discount badge ── */}
            {product.discount && product.discount > 0 && (
              <Badge
                variant="destructive"
                className="absolute left-3 top-3 z-10 rounded-md px-2 py-0.5 text-xs font-semibold"
              >
                -{product.discount}%
              </Badge>
            )}

            {/* ── Wishlist button ── */}
            <button
              type="button"
              onClick={handleToggleWishlist}
              aria-label={isWishlisted ? t("products.removeFromWishlist") : t("products.addToWishlist")}
              className={cn(
                "absolute right-3 top-3 z-10 flex size-9 items-center justify-center rounded-full border border-border/50 bg-background/80 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-foreground/20",
                isWishlisted && "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50",
              )}
            >
              <Heart
                size={16}
                className={cn(
                  "transition-colors duration-200",
                  isWishlisted
                    ? "fill-red-500 text-red-500"
                    : "text-foreground/70 group-hover/card:text-foreground",
                )}
              />
            </button>

            {/* ── Quick-add button (appears on hover) ── */}
            <div
              className={cn(
                "absolute bottom-0 left-0 right-0 p-3 pt-8 translate-y-2 opacity-0 transition-all duration-300",
                isHovered && "translate-y-0 opacity-100",
              )}
            >
              <Button
                size="sm"
                variant="secondary"
                className="w-full gap-1.5 bg-white/90 text-foreground backdrop-blur-sm hover:bg-white dark:bg-foreground/10 dark:hover:bg-foreground/20"
                onClick={handleAddToCart}
                disabled={!product.inStock || isAddingToCart}
              >
                <ShoppingBag size={14} />
                {isAddingToCart
                  ? t("products.adding")
                  : !product.inStock
                    ? t("products.outOfStock")
                    : t("products.addToCart")}
              </Button>
            </div>
          </div>

          {/* ── Content ── */}
          <div className="space-y-1.5 p-4 sm:p-5">
            {/* Brand */}
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </p>

            {/* Title */}
            <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors duration-200 group-hover/card:text-foreground/80 sm:text-base">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Color swatches (if available) */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex items-center gap-1.5 pt-1">
                {product.colors.slice(0, 4).map((color) => (
                  <span
                    key={color}
                    className="block size-3.5 rounded-full border border-border"
                    style={{ backgroundColor: color }}
                    aria-label={`Color: ${color}`}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="text-xs text-muted-foreground">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}