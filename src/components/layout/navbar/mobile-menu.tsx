"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { motionTokens } from "@/lib/motion";
import { useUIStore } from "@/stores/ui-store";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { MobileSearchBar } from "./search-bar";
import { CartButton } from "./cart-button";
import { WishlistButton } from "./wishlist-button";
import { AccountButton } from "./account-button";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "@/hooks/use-translations";

const menuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: motionTokens.duration.slow / 1000,
      ease: motionTokens.easing.emphasis,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: motionTokens.duration.fast / 1000,
      ease: motionTokens.easing.accelerate,
    },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export function MobileMenu() {
  const { t } = useTranslations();
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="mobile-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: motionTokens.duration.normal / 1000 }}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="mobile-drawer"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-background border-l border-border shadow-xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-border">
                <Logo onClick={closeMobileMenu} />
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full hover:bg-accent transition-colors"
                  aria-label={t("nav.closeMenu")}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
                <MobileSearchBar />
                <NavLinks mobile onItemClick={closeMobileMenu} />
                <LanguageSwitcher mobile onItemClick={closeMobileMenu} />
              </div>

              {/* Footer actions */}
              <div className="border-t border-border px-4 py-4 space-y-2">
                <AccountButton mobile onItemClick={closeMobileMenu} />
                <div className="flex items-center gap-2 pt-2">
                  <WishlistButton />
                  <span className="text-sm text-muted-foreground">{t("nav.wishlist")}</span>
                  <div className="flex-1" />
                  <CartButton />
                  <span className="text-sm text-muted-foreground">{t("nav.cart")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}