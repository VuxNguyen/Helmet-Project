"use client";

import { useLocaleStore, type Locale } from "@/stores/locale-store";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const locales: { value: Locale; label: string; flag: string }[] = [
  { value: "vi", label: "VI", flag: "🇻🇳" },
  { value: "en", label: "EN", flag: "🇬🇧" },
];

interface LanguageSwitcherProps {
  mobile?: boolean;
  onItemClick?: () => void;
}

export function LanguageSwitcher({ mobile, onItemClick }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLocaleStore();

  const handleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    onItemClick?.();
  };

  if (mobile) {
    return (
      <div className="space-y-2">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase px-1">
          Language
        </p>
        <div className="flex gap-2">
          {locales.map((l) => (
            <button
              key={l.value}
              onClick={() => handleChange(l.value)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                locale === l.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent text-accent-foreground hover:bg-accent/80",
              )}
              aria-label={`Switch to ${l.label}`}
            >
              <span className="text-base">{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5 border-l border-border pl-2 ml-1">
      {locales.map((l) => (
        <Button
          key={l.value}
          variant="ghost"
          size="sm"
          onClick={() => handleChange(l.value)}
          className={cn(
            "px-2 h-8 text-xs font-semibold tracking-wide rounded-md transition-colors",
            locale === l.value
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label={`Switch to ${l.label}`}
        >
          <span className="mr-1 text-sm">{l.flag}</span>
          {l.label}
        </Button>
      ))}
    </div>
  );
}