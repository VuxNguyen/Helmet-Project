import type { Metadata } from "next";
import { CartPageClient } from "@/features/cart/components/cart-page-client";

export const metadata: Metadata = {
  title: "Shopping Cart | Helmet Pro",
  description:
    "Review your selected helmets and proceed to checkout. Free shipping on orders over $200.",
  openGraph: {
    title: "Shopping Cart | Helmet Pro",
    description:
      "Review your selected helmets and proceed to checkout. Free shipping on orders over $200.",
  },
};

export default function CartPage() {
  return (
    <main className="min-h-screen">
      <CartPageClient />
    </main>
  );
}