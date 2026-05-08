"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      {/* Empty Icon */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <ShoppingBag
          className="h-10 w-10 text-muted-foreground/60"
          strokeWidth={1}
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold tracking-tight">
        Your cart is empty
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your cart is waiting to be filled. Browse our premium collection
        and find your perfect ride.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-11 gap-2 px-6">
          <Link href="/products">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            Browse Helmets
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-11 gap-2 px-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            Go Home
          </Link>
        </Button>
      </div>

      {/* Quick Links */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span>Popular categories:</span>
        <Link
          href="/products?category=full-face"
          className="underline transition-colors hover:text-foreground"
        >
          Full Face
        </Link>
        <Link
          href="/products?category=modular"
          className="underline transition-colors hover:text-foreground"
        >
          Modular
        </Link>
        <Link
          href="/products?category=open-face"
          className="underline transition-colors hover:text-foreground"
        >
          Open Face
        </Link>
        <Link
          href="/products?category=half"
          className="underline transition-colors hover:text-foreground"
        >
          Half Helmet
        </Link>
      </div>
    </motion.div>
  );
}