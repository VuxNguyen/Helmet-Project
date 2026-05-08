/**
 * Sample product detail data for the product detail page.
 * In production, this would come from an API.
 */

import type { ProductDetail, RelatedProduct } from "../types/product-detail"
import { sampleProducts } from "@/data/sample-products"

const placeholderImages = [
  "/placeholder-helmet.jpg",
  "/placeholder-helmet.jpg",
  "/placeholder-helmet.jpg",
  "/placeholder-helmet.jpg",
]

export const sampleProductDetail: ProductDetail = {
  id: "1",
  name: "Arai RX-7X Evo",
  brand: "Arai",
  slug: "arai-rx-7x-evo",
  description:
    "The Arai RX-7X Evo represents the pinnacle of motorcycle helmet engineering. Crafted with precision in Japan, this premium full-face helmet features an advanced ventilation system with multiple intake and exhaust ports, ensuring optimal airflow even at low speeds. The PB-SNC2 shell construction provides exceptional impact absorption while keeping weight to a minimum. The proprietary VAS (Variable Axis System) visor mechanism allows for a thinner, lighter visor with a wider field of view. Every detail, from the air-channeling brow vents to the neckroll exhaust system, has been meticulously designed for the most demanding riders.",
  shortDescription:
    "Premium full-face helmet with advanced ventilation and superior aerodynamics. Race-proven performance with unparalleled comfort.",
  images: placeholderImages,
  price: 899.99,
  originalPrice: 999.99,
  discount: 10,
  rating: 4.8,
  reviewCount: 124,
  category: "Full-Face",
  categorySlug: "full-face",
  inStock: true,
  stockCount: 15,
  sku: "ARA-RX7X-EVO-001",
  featured: true,
  colors: [
    { name: "Matte Black", hex: "#1A1A1A" },
    { name: "Racing Red", hex: "#DC2626" },
    { name: "Cobalt Blue", hex: "#2563EB" },
    { name: "Pearl White", hex: "#F5F5F5" },
  ],
  sizes: [
    { label: "XS", inStock: true },
    { label: "S", inStock: true },
    { label: "M", inStock: true },
    { label: "L", inStock: true },
    { label: "XL", inStock: true },
    { label: "2XL", inStock: false },
    { label: "3XL", inStock: false },
  ],
  specifications: [
    { label: "Shell Material", value: "PB-SNC2 (Peripherally Belted Super Complex Laminate)" },
    { label: "Weight", value: "1.65 kg (Size M)" },
    { label: "Safety Rating", value: "ECE 22.06, DOT, Snell M2025" },
    { label: "Visor Type", value: "VAS-Z Pro Shield System" },
    { label: "Internal Sun Visor", value: "No" },
    { label: "Ventilation", value: "5 intake ports, 4 exhaust ports" },
    { label: "Liner Type", value: "Facial Contour System, fully removable/washable" },
    { label: "Communication Ready", value: "Speaker pockets included" },
    { label: "Emergency Release", value: "Yes, cheek pad emergency tabs" },
    { label: "Warranty", value: "5 years from purchase date" },
  ],
  reviews: [
    {
      id: "r1",
      author: "Marco R.",
      rating: 5,
      date: "2025-12-15",
      title: "Best helmet I've ever owned",
      content:
        "I've been riding for over 20 years and this is hands down the best helmet I've ever owned. The ventilation is incredible — even in stop-and-go traffic, I stay cool. The fit is snug but not uncomfortable, and it's noticeably quieter than my previous Shoei. Worth every penny.",
      helpful: 47,
      verified: true,
    },
    {
      id: "r2",
      author: "Sarah K.",
      rating: 5,
      date: "2025-11-28",
      title: "Track-ready perfection",
      content:
        "Bought this for track days and it exceeded expectations. The field of view is wider than any helmet I've used before, which makes a huge difference when leaning into corners. The aero is stable at 160+ mph. Arai quality is unmatched.",
      helpful: 32,
      verified: true,
    },
    {
      id: "r3",
      author: "James T.",
      rating: 4,
      date: "2025-10-10",
      title: "Almost perfect, just a bit snug on cheeks",
      content:
        "Incredible build quality and the finish is beautiful. My only minor complaint is that the cheek pads are a bit tight for my face shape. I've heard they break in over time, and I'm starting to notice that. The helmet itself is fantastic — lightweight, great airflow, and the visor mechanism is buttery smooth.",
      helpful: 18,
      verified: true,
    },
    {
      id: "r4",
      author: "David L.",
      rating: 5,
      date: "2025-09-22",
      title: "The gold standard",
      content:
        "This is my third Arai and they never disappoint. The RX-7X Evo refinement over the previous model is noticeable — the visor change is easier, the ventilation is better, and it's slightly lighter. The level of craftsmanship is visible in every detail. If you value safety and quality, this is the one.",
      helpful: 24,
      verified: true,
    },
  ],
  relatedIds: ["2", "3", "4", "5"],
}

function getRelatedProducts(): RelatedProduct[] {
  return sampleProducts
    .filter((p) => sampleProductDetail.relatedIds.includes(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      slug: p.slug,
      image: p.image,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inStock: p.inStock,
      colors: p.colors,
    }))
}

export function getRelatedProductsFor(slug: string): RelatedProduct[] {
  const detail = getProductDetailBySlug(slug)
  if (!detail) return []

  return sampleProducts
    .filter((p) => detail.relatedIds.includes(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      brand: p.brand,
      slug: p.slug,
      image: p.image,
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      rating: p.rating,
      reviewCount: p.reviewCount,
      inStock: p.inStock,
      colors: p.colors,
    }))
}

export function getProductDetailBySlug(slug: string): ProductDetail | null {
  if (slug === sampleProductDetail.slug) {
    return { ...sampleProductDetail, relatedIds: sampleProductDetail.relatedIds }
  }
  return null
}

export const relatedProducts: RelatedProduct[] = getRelatedProducts()