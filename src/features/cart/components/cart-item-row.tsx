"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useCartStore, type CartItem } from "@/stores/cart-store";

interface CartItemRowProps {
  item: CartItem;
  isRemoving?: boolean;
}

export function CartItemRow({ item, isRemoving }: CartItemRowProps) {
  const { t } = useTranslations();
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        y: isRemoving ? -12 : 0,
        height: isRemoving ? 0 : "auto",
      }}
      exit={{ opacity: 0, y: -12, height: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "relative flex gap-4 border-b border-border pb-4 last:border-b-0 sm:gap-5",
        isRemoving && "pointer-events-none overflow-hidden",
      )}
    >
      {/* Product Image */}
      <Link
        href={`/products/${item.slug || item.id}`}
        className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted sm:h-28 sm:w-28"
      >
        <Image
          src={item.image || "/placeholder-helmet.svg"}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 96px, 112px"
        />
      </Link>

      {/* Item Details */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        {/* Top row: name + remove */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link
              href={`/products/${item.slug || item.id}`}
              className="text-sm font-medium leading-snug text-foreground transition-colors hover:text-foreground/70 sm:text-base"
            >
              {item.name}
            </Link>
            {item.variant && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.variant}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
            className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
            aria-label={t("cart.removeItemAria").replace("{{name}}", item.name)}
          >
            <Trash2 className="h-4 w-4" strokeWidth={1.5} />
          </Button>
        </div>

        {/* Bottom row: quantity + price */}
        <div className="flex items-center justify-between gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center gap-0.5 rounded-lg border border-input bg-background">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="flex h-8 w-8 items-center justify-center rounded-l-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
              aria-label={t("cart.decreaseQtyAria")}
            >
              <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
            <span className="flex h-8 w-10 items-center justify-center text-sm font-medium tabular-nums">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-r-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label={t("cart.increaseQtyAria")}
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <span className="text-sm font-semibold tabular-nums sm:text-base">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
            {item.quantity > 1 && (
              <p className="text-xs text-muted-foreground tabular-nums">
                ${item.price.toFixed(2)} {t("cart.each")}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}