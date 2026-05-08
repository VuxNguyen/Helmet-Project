"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useWishlistStore } from "@/stores/wishlist-store";
import { Button } from "@/components/ui/button";

interface WishlistButtonProps {
  className?: string;
}

export function WishlistButton({ className }: WishlistButtonProps) {
  const count = useWishlistStore((state) => state.items.length);

  return (
    <Button
      variant="ghost"
      size="icon"
      asChild
      className={cn("relative p-2 rounded-full", className)}
      aria-label={`Wishlist with ${count} items`}
    >
      <Link href="/wishlist">
        <Heart className="h-5 w-5" strokeWidth={1.5} />
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center text-[10px] font-bold text-primary-foreground bg-primary rounded-full min-w-[18px] min-h-[18px]"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </Link>
    </Button>
  );
}