/**
 * use-translations.ts — Hook to access translated strings from the dictionary.
 * Automatically reacts to the current locale from the Zustand store.
 *
 * Usage:
 *   const { t } = useTranslations();
 *   <h1>{t("hero.badge")}</h1>
 */

"use client";

import { useLocaleStore } from "@/stores/locale-store";
import { dictionary, type Dictionary, type Locale } from "@/lib/dictionary";

/**
 * Resolve a dot-separated path like "hero.badge" from the dictionary.
 * Falls back to the key path if not found.
 */
function resolve(obj: Dictionary, path: string, locale: Locale): string {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      console.warn(`[useTranslations] Key not found: ${path}`);
      return path;
    }
  }

  if (current && typeof current === "object" && locale in (current as Record<string, unknown>)) {
    const value = (current as Record<string, unknown>)[locale];
    if (typeof value === "string") {
      return value;
    }
    console.warn(`[useTranslations] Value is not a string for: ${path}[${locale}]`);
    return path;
  }

  console.warn(`[useTranslations] Locale not found for key: ${path}[${locale}]`);
  return path;
}

/**
 * useTranslations — returns a `t()` function that maps dictionary keys to
 * localized strings based on the current locale from the Zustand store.
 *
 * Example keys (see src/lib/dictionary.ts for full list):
 *  - "hero.badge"
 *  - "hero.headingLine1"
 *  - "hero.shopCollection"
 *  - "nav.shop"
 *  - "categories.sectionTitle"
 *  - "products.addToCart"
 *  - "footer.allRightsReserved"
 *  - "newsletter.title"
 */
export function useTranslations() {
  const locale = useLocaleStore((s) => s.locale);

  function t(key: string, params?: Record<string, string | number>): string {
    let value = resolve(dictionary, key, locale);
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        value = value.replaceAll(`{{${k}}}`, String(v));
      }
    }
    return value;
  }

  return { t, locale };
}