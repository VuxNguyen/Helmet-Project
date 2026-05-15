"use client";

import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "@/hooks/use-translations";
import { PAYMENT_METHODS } from "@/features/checkout/data/constants";
import type { CheckoutFormValues } from "@/features/checkout/lib/schema";

const paymentIcons: Record<string, React.ReactNode> = {
  "credit-card": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  paypal: (
    <span className="text-xs font-bold tracking-tight">P</span>
  ),
  stripe: (
    <span className="text-xs font-bold tracking-tight">S</span>
  ),
};

export function PaymentMethods() {
  const {
    setValue,
    watch,
    register,
    formState: { errors },
  } = useFormContext<CheckoutFormValues>();
  const { t, locale } = useTranslations();
  const selectedMethod = watch("paymentMethod");

  return (
    <div className="space-y-4">
      {/* Payment Method Selection */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => setValue("paymentMethod", method.id, { shouldValidate: true })}
              className={cn(
                "relative flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200",
                isSelected
                  ? "border-foreground bg-accent/30 shadow-sm"
                  : "border-border bg-card hover:border-muted-foreground/30 hover:bg-accent/10"
              )}
            >
              {/* Radio indicator */}
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

              {/* Icon placeholder */}
              <div className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                isSelected ? "bg-foreground text-background" : "bg-muted text-muted-foreground"
              )}>
                {paymentIcons[method.id]}
              </div>

              <span className="text-sm font-medium">
                {locale === "vi" ? method.labelVi : method.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Credit Card Details */}
      <AnimatePresence mode="wait">
        {selectedMethod === "credit-card" && (
          <motion.div
            key="credit-card-fields"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="space-y-4 overflow-hidden"
          >
            {/* Card Number */}
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-sm font-medium">
                {t("checkout.payment.cardNumber")}
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input
                  id="cardNumber"
                  placeholder="4242 4242 4242 4242"
                  className="h-11 pl-10 font-mono tracking-wider"
                  maxLength={19}
                  {...register("cardNumber")}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 16);
                    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1 ");
                    e.target.value = formatted;
                    register("cardNumber").onChange(e);
                  }}
                />
              </div>
              {errors.cardNumber && (
                <p className="text-xs text-destructive">{errors.cardNumber.message}</p>
              )}
            </div>

            {/* Cardholder Name */}
            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-sm font-medium">
                {t("checkout.payment.cardName")}
              </Label>
              <Input
                id="cardName"
                placeholder={t("checkout.payment.cardNamePlaceholder")}
                className="h-11"
                {...register("cardName")}
              />
              {errors.cardName && (
                <p className="text-xs text-destructive">{errors.cardName.message}</p>
              )}
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-sm font-medium">
                  {t("checkout.payment.expiryDate")}
                </Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  className="h-11 font-mono"
                  maxLength={5}
                  {...register("expiryDate")}
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
                    if (value.length >= 2) {
                      value = value.slice(0, 2) + "/" + value.slice(2);
                    }
                    e.target.value = value;
                    register("expiryDate").onChange(e);
                  }}
                />
                {errors.expiryDate && (
                  <p className="text-xs text-destructive">{errors.expiryDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-sm font-medium">
                  {t("checkout.payment.cvv")}
                </Label>
                <div className="relative">
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="•••"
                    className="h-11 font-mono"
                    maxLength={4}
                    {...register("cvv")}
                    onChange={(e) => {
                      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
                      register("cvv").onChange(e);
                    }}
                  />
                  <Lock className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                </div>
                {errors.cvv && (
                  <p className="text-xs text-destructive">{errors.cvv.message}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security Notice */}
      <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2.5">
        <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-xs text-muted-foreground">
          {t("checkout.payment.securityNotice")}
        </p>
      </div>
    </div>
  );
}
