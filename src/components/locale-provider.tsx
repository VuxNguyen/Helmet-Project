"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/stores/locale-store";

/**
 * LocaleProvider — syncs the Zustand locale state to the <html> lang attribute.
 * Must be rendered inside <html> to access document.documentElement.
 */
export function LocaleProvider() {
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}