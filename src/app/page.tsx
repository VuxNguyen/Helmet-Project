import type { Metadata } from "next"
import { HeroSection } from "@/components/hero"
import { CategoriesSection } from "@/components/categories"
import { BrandsShowcase } from "@/components/brands"
import { FeaturedProducts } from "@/components/products/featured-products"

export const metadata: Metadata = {
  title: "Mũ bảo hiểm xe máy cao cấp | Helmet Pro",
  description:
    "Khám phá bộ sưu tập mũ bảo hiểm xe máy cao cấp của chúng tôi. Được chế tác cho những người không ngừng vươn xa — công nghệ an toàn tiên tiến kết hợp phong cách đỉnh cao. Mua sắm bộ sưu tập 2025.",
}

async function getFeaturedProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/products/featured`, {
      cache: "no-store",
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.products || []
  } catch {
    return []
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BrandsShowcase />
      <FeaturedProducts products={featuredProducts} />
    </>
  )
}
