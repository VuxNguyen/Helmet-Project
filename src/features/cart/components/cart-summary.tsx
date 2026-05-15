"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, ArrowRight, Loader2, Percent, Gift, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "@/hooks/use-translations";
import { useCartStore } from "@/stores/cart-store";

const FREE_SHIPPING_THRESHOLD = 200;
const SHIPPING_COST = 15;
const TAX_RATE = 0.08;

export function CartSummary() {
  const { t } = useTranslations();
  const items = useCartStore((state) => state.items);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponError, setCouponError] = useState("");

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = appliedCoupon
    ? subtotal * (appliedCoupon.discount / 100)
    : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + shipping + tax;
  const freeShippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  );
  const freeShippingRemaining = Math.max(
    FREE_SHIPPING_THRESHOLD - subtotal,
    0,
  );

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === "HELMET10") {
      setAppliedCoupon({ code: "HELMET10", discount: 10 });
      setCouponError("");
      setCouponCode("");
    } else if (code === "RIDER20") {
      setAppliedCoupon({ code: "RIDER20", discount: 20 });
      setCouponError("");
      setCouponCode("");
    } else {
      setCouponError(t("cart.couponInvalid"));
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponError("");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <h3 className="text-base font-semibold tracking-tight">{t("cart.orderSummary")}</h3>

      {/* Free Shipping Progress */}
      {subtotal < FREE_SHIPPING_THRESHOLD && (
        <div className="mt-4 rounded-lg bg-muted/60 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Truck className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>
              {t("cart.addForFreeShipping").replace("{{amount}}", freeShippingRemaining.toFixed(2))}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <motion.div
              layout
              className="h-full rounded-full bg-foreground"
              style={{ width: `${freeShippingProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {subtotal >= FREE_SHIPPING_THRESHOLD && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 dark:bg-green-950/30">
          <div className="flex items-center gap-2 text-xs font-medium text-green-700 dark:text-green-400">
            <Truck className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>{t("cart.freeShippingQualified")}</span>
          </div>
        </div>
      )}

      {/* Coupon Input */}
      <div className="mt-5">
        <AnimatePresence mode="wait">
          {appliedCoupon ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-3 py-2 dark:border-green-900 dark:bg-green-950/30"
            >
              <div className="flex items-center gap-2">
                <Percent className="h-3.5 w-3.5 text-green-600 dark:text-green-400" strokeWidth={1.5} />
                <span className="text-xs font-medium text-green-700 dark:text-green-400">
                  {appliedCoupon.code} ({appliedCoupon.discount}% off)
                </span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-xs font-medium text-muted-foreground underline transition-colors hover:text-destructive"
              >
                {t("cart.removeCoupon")}
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex gap-2"
            >
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input
                  placeholder={t("cart.couponPlaceholder")}
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setCouponError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApplyCoupon();
                  }}
                  className="h-9 pl-8 text-sm"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim() || isApplyingCoupon}
                className="h-9 shrink-0"
              >
                {isApplyingCoupon ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  t("cart.applyCoupon")
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {couponError && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1.5 text-xs text-destructive"
          >
            {couponError}
          </motion.p>
        )}
      </div>

      {/* Pricing Lines */}
      <div className="mt-5 space-y-2.5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("cart.subtotal")}</span>
          <span className="font-medium tabular-nums">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {discount > 0 && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-green-600 dark:text-green-400">
              {t("cart.discount").replace("{{percent}}", String(appliedCoupon?.discount ?? 0))}
            </span>
            <span className="font-medium tabular-nums text-green-600 dark:text-green-400">
              -${discount.toFixed(2)}
            </span>
          </motion.div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("cart.shipping")}</span>
          <span className="font-medium tabular-nums">
            {shipping === 0 ? (
              <span className="text-green-600 dark:text-green-400">{t("cart.freeShippingLabel")}</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{t("cart.tax")}</span>
          <span className="font-medium tabular-nums">${tax.toFixed(2)}</span>
        </div>

        <Separator className="my-2" />

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold">{t("cart.total")}</span>
          <span className="text-lg font-bold tabular-nums">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button asChild className="mt-6 h-11 w-full gap-2 text-sm font-medium" disabled={items.length === 0}>
        <Link href="/checkout">
          {t("cart.proceedToCheckout")}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </Button>

      {/* Trust Indicators */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Gift className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span>{t("cart.trustFreeReturns30")}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
          <span>{t("cart.trustSslCheckout")}</span>
        </div>
      </div>
    </div>
  );
}