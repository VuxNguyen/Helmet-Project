"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { NAVIGATION } from "@/lib/constants";
import { motionTokens } from "@/lib/motion";
import { useUIStore } from "@/stores/ui-store";
import { useTranslations } from "@/hooks/use-translations";

/**
 * Maps NAVIGATION label → dictionary key.
 */
const NAV_LABEL_KEYS: Record<string, string> = {
  Shop: "nav.shop",
  Collections: "nav.collections",
  About: "nav.about",
  Contact: "nav.contact",
};

interface NavLinksProps {
  className?: string;
  mobile?: boolean;
  onItemClick?: () => void;
}

export function NavLinks({ className, mobile = false, onItemClick }: NavLinksProps) {
  const { t } = useTranslations();
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        mobile ? "flex flex-col gap-1" : "hidden lg:flex items-center gap-1",
        className,
      )}
    >
      {NAVIGATION.primary.map((link) => {
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onItemClick}
            className={cn(
              "relative px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-md",
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
              mobile && "px-3 py-2.5 text-base",
            )}
          >
            {t(NAV_LABEL_KEYS[link.label] || link.label)}
            {isActive && (
              <motion.span
                layoutId={mobile ? "mobile-active-nav" : "active-nav"}
                className={cn(
                  "absolute inset-0 rounded-md bg-accent -z-10",
                )}
                transition={{
                  duration: motionTokens.duration.normal / 1000,
                  ease: motionTokens.easing.default,
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}