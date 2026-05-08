'use client'

import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

import { motionTokens } from "@/lib/motion"
import { ProductGallery } from "./product-gallery"
import { ProductInfo } from "./product-info"
import { ProductDescription } from "./product-description"
import { ProductReviews } from "./product-reviews"
import { RelatedProducts } from "./related-products"
import type { ProductDetail, RelatedProduct } from "../types/product-detail"

/* ───────── Types ───────── */

interface ProductDetailClientProps {
  product: ProductDetail
  relatedProducts: RelatedProduct[]
}

/* ───────── Component ───────── */

export function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  return (
    <main className="min-h-screen">
      {/* ── Product Hero Section ── */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          {/* Back link (mobile) */}
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <ChevronLeft size={16} />
            Back to Products
          </Link>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-8 md:px-6 md:pb-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Left: Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: motionTokens.duration.slow / 1000,
                ease: motionTokens.easing.decelerate,
              }}
            >
              <ProductGallery
                images={product.images}
                productName={product.name}
                discount={product.discount}
              />
            </motion.div>

            {/* Right: Info */}
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      {/* ── Description & Specs Section ── */}
      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <ProductDescription
            description={product.description}
            specifications={product.specifications}
          />
        </div>
      </section>

      {/* ── Reviews Section ── */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <ProductReviews
            reviews={product.reviews}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <hr className="border-border" />
      </div>

      {/* ── Related Products Section ── */}
      <section className="pb-16 md:pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:py-20">
          <RelatedProducts products={relatedProducts} />
        </div>
      </section>
    </main>
  )
}