"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useCartStore } from "@/stores/cart-store";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  className?: string;
}

export function CartButton({ className }: CartButtonProps) {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className={cn("relative p-2 rounded-full", className)}
      aria-label={`Shopping cart with ${itemCount} items`}
    >
      <Link href="/cart">
        <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: motionTokens.easing.spring.stiffness,
              damping: motionTokens.easing.spring.damping,
            }}
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4.5 h-4.5 text-[10px] font-bold text-primary-foreground bg-primary rounded-full min-w-[18px] min-h-[18px]"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.span>
        )}
      </Link>
    </Button>
  );
}
