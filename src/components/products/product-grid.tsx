'use client'

import { useState, useCallback } from "react"
import { type Product } from "@/data/products"
import { ProductCard } from "./product-card"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { motion } from "framer-motion"
import { useTranslations } from "@/hooks/use-translations"

interface ProductGridProps {
  products: Product[]
  title?: string
  subtitle?: string
  columns?: 2 | 3 | 4
}

export function ProductGrid({
  products,
  title,
  subtitle,
  columns = 4,
}: ProductGridProps) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }

  const handleToggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(product.id)) {
        next.delete(product.id)
      } else {
        next.add(product.id)
      }
      return next
    })
  }, [])

  const handleAddToCart = useCallback((product: Product) => {
    // Placeholder — will integrate with cart store later
    console.log("Add to cart:", product.name)
  }, [])

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        {(title || subtitle) && (
          <div className="mb-10 md:mb-14">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className={`grid grid-cols-1 gap-5 md:gap-6 ${gridCols[columns]}`}
        >
          {products.map((product, index) => (
            <motion.div key={product.id} variants={staggerItem}>
              <ProductCard
                product={product}
                index={index}
                isWishlisted={wishlist.has(product.id)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}