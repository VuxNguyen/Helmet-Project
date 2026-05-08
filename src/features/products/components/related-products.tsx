'use client'

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { motionTokens } from "@/lib/motion"
import { Button } from "@/components/ui/button"
import type { RelatedProduct } from "../types/product-detail"

/* ───────── Types ───────── */

interface RelatedProductsProps {
  products: RelatedProduct[]
  className?: string
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

/* ───────── Component ───────── */

export function RelatedProducts({ products, className }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: motionTokens.duration.slow / 1000, ease: motionTokens.easing.decelerate }}
      className={cn("w-full", className)}
    >
      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Complete Your Gear
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Customers who viewed this also liked these helmets.
          </p>
        </div>
        <Button variant="ghost" className="hidden gap-2 sm:flex" asChild>
          <Link href="/products">
            View All
            <ArrowRight size={14} />
          </Link>
        </Button>
      </div>

      {/* ── Product Grid ── */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: motionTokens.duration.normal / 1000,
              delay: index * 0.06,
              ease: motionTokens.easing.decelerate,
            }}
          >
            <Link
              href={`/products/${product.slug}`}
              className="group block"
              aria-label={`View ${product.name}`}
            >
              <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted transition-all duration-300 group-hover:shadow-md">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />

                {/* Discount badge */}
                {product.discount && product.discount > 0 && (
                  <span className="absolute left-2 top-2 rounded-md bg-destructive px-1.5 py-0.5 text-[10px] font-bold text-destructive-foreground">
                    -{product.discount}%
                  </span>
                )}

                {/* Out of stock overlay */}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-3 space-y-1">
                <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                  {product.brand}
                </p>
                <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-foreground/80">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1">
                  <Star size={10} className="fill-amber-400 text-amber-400" />
                  <span className="text-[11px] text-muted-foreground">{product.rating}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Color swatches */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex items-center gap-1 pt-0.5">
                    {product.colors.slice(0, 3).map((color) => (
                      <span
                        key={color}
                        className="block size-3 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                        aria-label={`Color: ${color}`}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-[10px] text-muted-foreground">
                        +{product.colors.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Mobile "View All" link */}
      <div className="mt-8 text-center sm:hidden">
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/products">
            View All Products
            <ArrowRight size={14} />
          </Link>
        </Button>
      </div>
    </motion.section>
  )
}