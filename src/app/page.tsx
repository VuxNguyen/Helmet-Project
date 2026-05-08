import type { Metadata } from "next"
import { HeroSection } from "@/components/hero"
import { CategoriesSection } from "@/components/categories"
import { BrandsShowcase } from "@/components/brands"
import { FeaturedProducts } from "@/components/products/featured-products"
import { sampleProducts } from "@/data/sample-products"

export const metadata: Metadata = {
  title: "Mũ bảo hiểm xe máy cao cấp | Helmet Pro",
  description:
    "Khám phá bộ sưu tập mũ bảo hiểm xe máy cao cấp của chúng tôi. Được chế tác cho những người không ngừng vươn xa — công nghệ an toàn tiên tiến kết hợp phong cách đỉnh cao. Mua sắm bộ sưu tập 2025.",
}

const featuredProducts = sampleProducts.filter((p) => p.featured)

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BrandsShowcase />
      <FeaturedProducts products={featuredProducts} />
    </>
  )
}
