/**
 * Locale store — Zustand
 * Manages the current language/locale for the site.
 * Default: "vi" (Vietnamese), users can switch to "en" (English).
 */

import { create } from "zustand";

export type Locale = "vi" | "en";

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

export const useLocaleStore = create<LocaleState>()((set) => ({
  locale: "vi",

  setLocale: (locale: Locale) => set({ locale }),

  toggleLocale: () =>
    set((state) => ({
      locale: state.locale === "vi" ? "en" : "vi",
    })),
}));