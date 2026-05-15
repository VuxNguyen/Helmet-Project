import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProductDetailClient } from "@/features/products/components/product-detail-client"

/* ───────── Props ───────── */

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

/* ───────── Fetch Helpers ───────── */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

async function fetchProduct(slug: string) {
  const res = await fetch(`${BASE_URL}/api/products/${slug}`, { cache: "no-store" })
  if (!res.ok) return null
  return res.json() as Promise<{
    product: import("@/features/products/types/product-detail").ProductDetail
    related: import("@/features/products/types/product-detail").RelatedProduct[]
  }>
}

/* ───────── Metadata ───────── */

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const data = await fetchProduct(slug)

  if (!data) {
    return { title: "Product Not Found | Helmet Pro" }
  }

  return {
    title: `${data.product.name} | Helmet Pro`,
    description: data.product.shortDescription,
    openGraph: {
      title: `${data.product.name} | Helmet Pro`,
      description: data.product.shortDescription,
      images: data.product.images[0] ? [data.product.images[0]] : [],
    },
  }
}

/* ───────── Page Component ───────── */

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const data = await fetchProduct(slug)

  if (!data) {
    notFound()
  }

  return (
    <ProductDetailClient
      product={data.product}
      relatedProducts={data.related}
    />
  )
}