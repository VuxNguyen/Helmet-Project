"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Truck, Clock, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/hooks/use-translations";
import { SHIPPING_METHODS } from "@/features/checkout/data/constants";
import type { CheckoutFormValues } from "@/features/checkout/lib/schema";
import type { ShippingMethod } from "@/features/checkout/types";

const shippingIcons: Record<ShippingMethod, typeof Truck> = {
  standard: Truck,
  express: Clock,
  "next-day": Zap,
};

export function DeliveryOptions() {
  const { setValue, watch } = useFormContext<CheckoutFormValues>();
  const selectedMethod = watch("shippingMethod");
  const { t, locale } = useTranslations();

  return (
    <div className="space-y-3">
      {SHIPPING_METHODS.map((method) => {
        const Icon = shippingIcons[method.id];
        const isSelected = selectedMethod === method.id;

        return (
          <button
            key={method.id}
            type="button"
            onClick={() => setValue("shippingMethod", method.id, { shouldValidate: true })}
            className={cn(
              "relative flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all duration-200",
              isSelected
                ? "border-foreground bg-accent/30 shadow-sm"
                : "border-border bg-card hover:border-muted-foreground/30 hover:bg-accent/10"
            )}
          >
            {/* Selected Indicator */}
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                isSelected
                  ? "border-foreground bg-foreground"
                  : "border-muted-foreground/40"
              )}
            >
              {isSelected && (
                <Check className="h-3 w-3 text-background" strokeWidth={2.5} />
              )}
            </div>

            {/* Icon */}
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                isSelected ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" strokeWidth={1.5} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">
                  {locale === "vi" ? method.labelVi : method.label}
                </span>
                <span className={cn(
                  "text-sm font-semibold tabular-nums whitespace-nowrap",
                  method.cost === 0 && "text-green-600 dark:text-green-400"
                )}>
                  {method.cost === 0
                    ? t("checkout.delivery.free")
                    : `$${method.cost.toFixed(2)}`}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {locale === "vi" ? method.descriptionVi : method.description}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground/70">
                {locale === "vi" ? method.estimatedDaysVi : method.estimatedDays}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
