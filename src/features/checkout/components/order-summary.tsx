"use client";

import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { motion } from "framer-motion";
import { Package, Truck, ShieldCheck, RotateCcw, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";
import { SHIPPING_METHODS, TAX_RATE, FREE_SHIPPING_THRESHOLD } from "@/features/checkout/data/constants";
import type { CheckoutFormValues } from "@/features/checkout/lib/schema";

interface OrderSummaryProps {
  locale?: "vi" | "en";
}

export function OrderSummary({ locale = "en" }: OrderSummaryProps) {
  const items = useCartStore((state) => state.items);
  const { watch } = useFormContext<CheckoutFormValues>();
  const selectedShipping = watch("shippingMethod");

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shippingOption = SHIPPING_METHODS.find((m) => m.id === selectedShipping);
  const shippingCost = shippingOption?.cost ?? 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shippingCost + tax;

  return (
    <div className="rounded-xl border border-border bg-card">
      <div className="p-5 sm:p-6">
        <h3 className="text-base font-semibold tracking-tight">
          {locale === "vi" ? "Tóm tắt đơn hàng" : "Order Summary"}
        </h3>

        {/* Items List */}
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p className="truncate text-sm font-medium">{item.name}</p>
                {item.variant && (
                  <p className="text-xs text-muted-foreground">{item.variant}</p>
                )}
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {locale === "vi" ? `SL: ${item.quantity}` : `Qty: ${item.quantity}`}
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        {/* Pricing */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {locale === "vi" ? "Tạm tính" : "Subtotal"}
            </span>
            <span className="font-medium tabular-nums">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {locale === "vi" ? "Vận chuyển" : "Shipping"}
            </span>
            <span className="font-medium tabular-nums">
              {shippingCost === 0 ? (
                <span className="text-green-600 dark:text-green-400">
                  {locale === "vi" ? "Miễn phí" : "Free"}
                </span>
              ) : (
                `$${shippingCost.toFixed(2)}`
              )}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {locale === "vi" ? `Thuế (${(TAX_RATE * 100).toFixed(0)}%)` : `Tax (${(TAX_RATE * 100).toFixed(0)}%)`}
            </span>
            <span className="font-medium tabular-nums">${tax.toFixed(2)}</span>
          </div>

          <Separator className="my-2" />

          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">
              {locale === "vi" ? "Tổng cộng" : "Total"}
            </span>
            <span className="text-lg font-bold tabular-nums">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>
              {locale === "vi"
                ? "Thanh toán an toàn với mã hóa SSL"
                : "Secure checkout with SSL encryption"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>
              {locale === "vi"
                ? "Đổi trả miễn phí trong 30 ngày"
                : "Free returns within 30 days"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShoppingBag className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>
              {locale === "vi"
                ? "Miễn phí vận chuyển cho đơn trên $200"
                : "Free shipping on orders over $200"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}