"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";

export function EmptyCart() {
  const { t } = useTranslations();
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
        {t("cart.emptyTitle")}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {t("cart.emptyDescription")}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-11 gap-2 px-6">
          <Link href="/products">
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            {t("cart.browseHelmets")}
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="h-11 gap-2 px-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            {t("cart.goHome")}
          </Link>
        </Button>
      </div>

      {/* Quick Links */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span>{t("cart.popularCategories")}</span>
        <Link
          href="/products?category=full-face"
          className="underline transition-colors hover:text-foreground"
        >
          {t("categories.fullface.name")}
        </Link>
        <Link
          href="/products?category=modular"
          className="underline transition-colors hover:text-foreground"
        >
          {t("categories.modular.name")}
        </Link>
        <Link
          href="/products?category=open-face"
          className="underline transition-colors hover:text-foreground"
        >
          {t("categories.openFace.name")}
        </Link>
        <Link
          href="/products?category=half"
          className="underline transition-colors hover:text-foreground"
        >
          {t("categories.half.name")}
        </Link>
      </div>
    </motion.div>
  );
}