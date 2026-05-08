"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useUIStore } from "@/stores/ui-store";
import { Container } from "@/components/layout/container";
import { Logo } from "./logo";
import { NavLinks } from "./nav-links";
import { CartButton } from "./cart-button";
import { WishlistButton } from "./wishlist-button";
import { AccountButton } from "./account-button";
import { LanguageSwitcher } from "./language-switcher";
import { MobileMenu } from "./mobile-menu";
import { useTranslations } from "@/hooks/use-translations";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { toggleMobileMenu } = useUIStore();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Track scroll position for background styling only
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = searchInputRef.current?.value.trim();
    if (value) {
      router.push(`/products?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50",
          className,
        )}
      >
        {/* Top bar with backdrop blur */}
        <div
          className={cn(
            "border-b transition-colors duration-200",
            isScrolled
              ? "border-border bg-background/80 backdrop-blur-xl"
              : "border-transparent bg-background/50 backdrop-blur-sm",
          )}
        >
          <Container as="nav" className="flex items-center justify-between h-16 md:h-18">
            {/* Left: Logo + Desktop Nav */}
            <div className="flex items-center gap-8">
              <Logo />
              <NavLinks />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Always-visible search input (desktop) */}
              <form
                onSubmit={handleSearchSubmit}
                className="hidden sm:flex items-center gap-2 h-9 rounded-full bg-accent/60 hover:bg-accent border border-border/50 focus-within:border-ring focus-within:ring-1 focus-within:ring-ring transition-all px-3 ml-auto max-w-[200px] lg:max-w-[240px]"
              >
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={t("nav.search")}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none border-none min-w-0"
                />
              </form>

              {/* Wishlist (desktop) */}
              <div className="hidden sm:flex">
                <WishlistButton />
              </div>

              {/* Account (desktop) */}
              <div className="hidden md:flex">
                <AccountButton />
              </div>

              {/* Cart */}
              <CartButton />

              {/* Language switcher (desktop) — far right */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* Mobile menu toggle */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-full hover:bg-accent transition-colors"
                aria-label={t("nav.toggleMenu")}
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </Container>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-16 md:h-18" />

      {/* Mobile menu drawer */}
      <MobileMenu />
    </>
  );
}
