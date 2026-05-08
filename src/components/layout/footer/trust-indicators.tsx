"use client";

import { Shield, Truck, RotateCcw, Lock } from "lucide-react";
import { useTranslations } from "@/hooks/use-translations";

const indicatorKeys = [
  {
    icon: Shield,
    labelKey: "footerTrust.safeSecure",
    descKey: "footerTrust.safeSecureDesc",
  },
  {
    icon: Truck,
    labelKey: "footerTrust.freeShippingFt",
    descKey: "footerTrust.freeShippingFtDesc",
  },
  {
    icon: RotateCcw,
    labelKey: "footerTrust.returnsFt",
    descKey: "footerTrust.returnsFtDesc",
  },
  {
    icon: Lock,
    labelKey: "footerTrust.secureCheckoutFt",
    descKey: "footerTrust.secureCheckoutFtDesc",
  },
] as const;

export function TrustIndicators() {
  const { t } = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {indicatorKeys.map((indicator) => {
        const Icon = indicator.icon;
        return (
          <div
            key={indicator.labelKey}
            className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-muted-foreground/30"
          >
            <Icon className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-xs font-medium text-foreground">
                {t(indicator.labelKey)}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                {t(indicator.descKey)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}