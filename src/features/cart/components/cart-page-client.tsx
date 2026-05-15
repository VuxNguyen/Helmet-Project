"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowLeft,
  Trash2,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "@/hooks/use-translations";
import { useCartStore } from "@/stores/cart-store";
import { CartItemRow } from "@/features/cart/components/cart-item-row";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { EmptyCart } from "@/features/cart/components/empty-cart";

export function CartPageClient() {
  const { t } = useTranslations();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  const handleRemoveItem = (id: string) => {
    setRemovingIds((prev) => new Set(prev).add(id));
    // The store handles removal, animation state is maintained locally
    setTimeout(() => {
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 200);
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-12">
      {/* Page Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              href="/"
              className="transition-colors hover:text-foreground"
            >
              {t("checkout.breadcrumb.home")}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t("nav.cart")}</span>
          </div>
          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {t("cart.pageTitle")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("cart.itemCount").replace("{{count}}", String(items.reduce((total, item) => total + item.quantity, 0)))}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 text-xs"
            onClick={() => clearCart()}
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
            {t("cart.clearCart")}
          </Button>
          <Button asChild variant="ghost" size="sm" className="h-9 gap-2 text-xs">
            <Link href="/products">
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              {t("cart.continueShopping")}
            </Link>
          </Button>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Cart Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        {/* Cart Items */}
        <div>
          {/* Item Count + Action */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {t("cart.itemsInCart").replace("{{count}}", String(items.length))}
            </span>
          </div>

          {/* Items List */}
          <motion.div layout className="space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <CartItemRow key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-lg border border-border bg-muted/30 px-4 py-3 sm:gap-6 sm:px-5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck
                className="h-4 w-4 shrink-0 text-foreground/60"
                strokeWidth={1.5}
              />
              <span>{t("cart.trustSecureCheckout")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <RotateCcw
                className="h-4 w-4 shrink-0 text-foreground/60"
                strokeWidth={1.5}
              />
              <span>{t("cart.trustFreeReturns")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShoppingBag
                className="h-4 w-4 shrink-0 text-foreground/60"
                strokeWidth={1.5}
              />
              <span>{t("cart.trustFreeShipOver")}</span>
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}