"use client";

import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SITE } from "@/lib/constants";
import { FooterLinks } from "./footer-links";
import { Newsletter } from "./newsletter";
import { SocialIcons } from "./social-icons";
import { TrustIndicators } from "./trust-indicators";
import { useTranslations } from "@/hooks/use-translations";

export function Footer() {
  const { t } = useTranslations();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      {/* Trust Indicators */}
      <div className="border-b border-border bg-muted/30">
        <Container className="py-8 md:py-10">
          <TrustIndicators />
        </Container>
      </div>

      {/* Main Footer Content */}
      <div className="py-12 md:py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_2fr]">
            {/* Brand + Newsletter */}
            <div className="space-y-8">
              <div>
                <Link
                  href="/"
                  className="text-xl font-bold tracking-tight text-foreground"
                >
                  {SITE.name}
                </Link>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t("site.tagline")}. {t("site.description")}
                </p>
              </div>

              <div className="hidden sm:block">
                <Newsletter />
              </div>

              <div className="hidden sm:block">
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
                  {t("footer.connect")}
                </h4>
                <SocialIcons />
              </div>
            </div>

            {/* Links */}
            <FooterLinks />
          </div>
        </Container>
      </div>

      {/* Newsletter on mobile (outside grid) */}
      <div className="border-t border-border sm:hidden">
        <Container className="py-8">
          <Newsletter />
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {currentYear} {SITE.name}. {t("footer.allRightsReserved")}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link
                href="/privacy"
                className="transition-colors hover:text-foreground"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <span className="text-border" aria-hidden="true">|</span>
              <Link
                href="/terms"
                className="transition-colors hover:text-foreground"
              >
                {t("footer.termsOfService")}
              </Link>
              <span className="text-border" aria-hidden="true">|</span>
              <Link
                href="/shipping"
                className="transition-colors hover:text-foreground"
              >
                {t("footer.shipping")}
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}