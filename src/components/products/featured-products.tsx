"use client";

import { type Product } from "@/data/products";
import { ProductGrid } from "./product-grid";
import { useTranslations } from "@/hooks/use-translations";

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { t } = useTranslations();

  return (
    <ProductGrid
      products={products}
      title={t("products.featuredTitle")}
      subtitle={t("products.featuredSubtitle")}
    />
  );
}