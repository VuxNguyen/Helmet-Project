"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NAVIGATION, SITE } from "@/lib/constants";
import { SocialIcons } from "./social-icons";
import { useTranslations } from "@/hooks/use-translations";

const GROUPS = [
  { titleKey: "footer.shop" as const, links: NAVIGATION.footer.shop },
  { titleKey: "footer.support" as const, links: NAVIGATION.footer.support },
  { titleKey: "footer.company" as const, links: NAVIGATION.footer.company },
] as const;

/**
 * Maps footer link label -> dictionary key for translation.
 */
const FOOTER_LINK_KEYS: Record<string, string> = {
  "All Helmets": "footerLinks.allHelmets",
  "Full Face": "footerLinks.fullFace",
  Modular: "footerLinks.modular",
  "Open Face": "footerLinks.openFace",
  Accessories: "footerLinks.accessories",
  "Contact Us": "footerLinks.contactUs",
  FAQ: "footerLinks.faq",
  "Shipping & Returns": "footerLinks.shippingReturns",
  "Size Guide": "footerLinks.sizeGuide",
  Warranty: "footerLinks.warranty",
  "About Us": "footerLinks.aboutUs",
  Careers: "footerLinks.careers",
  Press: "footerLinks.press",
  "Privacy Policy": "footer.privacyPolicy",
  "Terms of Service": "footer.termsOfService",
};

export function FooterLinks() {
  const { t } = useTranslations();
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);

  const toggleSection = (titleKey: string) => {
    setOpenMobileSection((prev) => (prev === titleKey ? null : titleKey));
  };

  return (
    <>
      {/* Desktop link columns */}
      <div className="hidden sm:grid sm:grid-cols-3 gap-8 lg:gap-12">
        {GROUPS.map((group) => (
          <div key={group.titleKey}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t(group.titleKey)}
            </h4>
            <ul className="space-y-3">
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {t(FOOTER_LINK_KEYS[link.label] || link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Mobile accordion */}
      <div className="divide-y divide-border sm:hidden">
        {GROUPS.map((group) => (
          <div key={group.titleKey}>
            <button
              onClick={() => toggleSection(group.titleKey)}
              className="flex w-full items-center justify-between py-2 text-sm font-semibold uppercase tracking-wider text-foreground transition-colors hover:text-muted-foreground"
              aria-expanded={openMobileSection === group.titleKey}
            >
              {t(group.titleKey)}
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  openMobileSection === group.titleKey ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {openMobileSection === group.titleKey && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-3 pt-1">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {t(FOOTER_LINK_KEYS[link.label] || link.label)}
                        </Link>
                      </li>
                    ))}
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Company info & social — visible on mobile within accordion area */}
      <div className="mt-8 space-y-6 sm:hidden">
        <div>
          <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
            {t("footer.connect")}
          </h4>
          <SocialIcons />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {SITE.address}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {SITE.phone} &middot; {SITE.email}
          </p>
        </div>
      </div>
    </>
  );
}