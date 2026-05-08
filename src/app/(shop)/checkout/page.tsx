import type { Metadata } from "next";
import { CheckoutPageClient } from "@/features/checkout/components/checkout-page-client";

export const metadata: Metadata = {
  title: "Checkout | Helmet Pro",
  description:
    "Complete your helmet purchase with our secure checkout process.",
  openGraph: {
    title: "Checkout | Helmet Pro",
    description:
      "Complete your helmet purchase with our secure checkout process.",
  },
};

export default function CheckoutPage() {
  return <CheckoutPageClient locale="en" />;
}