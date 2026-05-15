"use client"

import { useState, useCallback } from "react"
import { useProductListing } from "../hooks/use-product-listing"
import { ProductCard } from "@/components/products/product-card"
import { type Product } from "@/data/products"
import { motion } from "framer-motion"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { PackageSearch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFilterStore } from "../stores/filter-store"
import { useCartStore } from "@/stores/cart-store"
import { useTranslations } from "@/hooks/use-translations"

export function ProductListingGrid() {
  const { products, isEmpty } = useProductListing()
  const resetFilters = useFilterStore((s) => s.resetFilters)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = useCallback((product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    })
  }, [addItem])

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

  if (isEmpty) {
    return <EmptyState onReset={resetFilters} />
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
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
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  const { t } = useTranslations()
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <PackageSearch size={28} className="text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{t("products.noProductsFound")}</h3>
      <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
        {t("products.noProductsHint")}
      </p>
      <Button variant="outline" size="sm" className="mt-6" onClick={onReset}>
        {t("products.clearAll")}
      </Button>
    </div>
  )
}