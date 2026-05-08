import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getProductDetailBySlug, getRelatedProductsFor } from "@/features/products/data/product-detail-data"
import { ProductDetailClient } from "@/features/products/components/product-detail-client"

/* ───────── Props ───────── */

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

/* ───────── Metadata ───────── */

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductDetailBySlug(slug)

  if (!product) {
    return { title: "Product Not Found | Helmet Pro" }
  }

  return {
    title: `${product.name} | Helmet Pro`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Helmet Pro`,
      description: product.shortDescription,
      images: product.images[0] ? [product.images[0]] : [],
    },
  }
}

/* ───────── Page Component ───────── */

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = getProductDetailBySlug(slug)
  const relatedProducts = getRelatedProductsFor(slug)

  if (!product) {
    notFound()
  }

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  )
}