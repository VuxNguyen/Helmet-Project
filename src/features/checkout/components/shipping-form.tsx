"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, User, Building } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "@/hooks/use-translations";
import { US_STATES } from "@/features/checkout/data/constants";
import type { CheckoutFormValues } from "@/features/checkout/lib/schema";

export function ShippingForm() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<CheckoutFormValues>();
  const { t } = useTranslations();

  const shippingErrors = errors.shippingAddress;
  const watchedCountry = watch("shippingAddress.country");

  return (
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            {t("checkout.shipping.firstName")}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <Input
              id="firstName"
              placeholder={t("checkout.shipping.firstNamePlaceholder")}
              className="h-11 pl-10"
              {...register("shippingAddress.firstName")}
            />
          </div>
          {shippingErrors?.firstName && (
            <p className="text-xs text-destructive">{shippingErrors.firstName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            {t("checkout.shipping.lastName")}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <Input
              id="lastName"
              placeholder={t("checkout.shipping.lastNamePlaceholder")}
              className="h-11 pl-10"
              {...register("shippingAddress.lastName")}
            />
          </div>
          {shippingErrors?.lastName && (
            <p className="text-xs text-destructive">{shippingErrors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            {t("checkout.shipping.email")}
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="h-11 pl-10"
              {...register("shippingAddress.email")}
            />
          </div>
          {shippingErrors?.email && (
            <p className="text-xs text-destructive">{shippingErrors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            {t("checkout.shipping.phone")}
          </Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              className="h-11 pl-10"
              {...register("shippingAddress.phone")}
            />
          </div>
          {shippingErrors?.phone && (
            <p className="text-xs text-destructive">{shippingErrors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="address" className="text-sm font-medium">
          {t("checkout.shipping.address")}
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input
            id="address"
            placeholder={t("checkout.shipping.addressPlaceholder")}
            className="h-11 pl-10"
            {...register("shippingAddress.address")}
          />
        </div>
        {shippingErrors?.address && (
          <p className="text-xs text-destructive">{shippingErrors.address.message}</p>
        )}
      </div>

      {/* Apartment */}
      <div className="space-y-2">
        <Label htmlFor="apartment" className="text-sm font-medium">
          {t("checkout.shipping.apartment")}
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input
            id="apartment"
            placeholder={t("checkout.shipping.apartmentPlaceholder")}
            className="h-11 pl-10"
            {...register("shippingAddress.apartment")}
          />
        </div>
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium">
            {t("checkout.shipping.city")}
          </Label>
          <Input
            id="city"
            placeholder={t("checkout.shipping.cityPlaceholder")}
            className="h-11"
            {...register("shippingAddress.city")}
          />
          {shippingErrors?.city && (
            <p className="text-xs text-destructive">{shippingErrors.city.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="state" className="text-sm font-medium">
            {t("checkout.shipping.state")}
          </Label>
          <Select
            value={watch("shippingAddress.state")}
            onValueChange={(value) => setValue("shippingAddress.state", value, { shouldValidate: true })}
          >
            <SelectTrigger id="state" className="h-11">
              <SelectValue placeholder={t("checkout.shipping.statePlaceholder")} />
            </SelectTrigger>
            <SelectContent className="max-h-[280px]">
              {US_STATES.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {shippingErrors?.state && (
            <p className="text-xs text-destructive">{shippingErrors.state.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="zipCode" className="text-sm font-medium">
            {t("checkout.shipping.zipCode")}
          </Label>
          <Input
            id="zipCode"
            placeholder="10001"
            className="h-11"
            {...register("shippingAddress.zipCode")}
          />
          {shippingErrors?.zipCode && (
            <p className="text-xs text-destructive">{shippingErrors.zipCode.message}</p>
          )}
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label htmlFor="country" className="text-sm font-medium">
          {t("checkout.shipping.country")}
        </Label>
        <Select
          value={watch("shippingAddress.country")}
          onValueChange={(value) => setValue("shippingAddress.country", value, { shouldValidate: true })}
        >
          <SelectTrigger id="country" className="h-11">
            <SelectValue placeholder={t("checkout.shipping.countryPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="US">United States</SelectItem>
            <SelectItem value="VN">Việt Nam</SelectItem>
            <SelectItem value="CA">Canada</SelectItem>
            <SelectItem value="GB">United Kingdom</SelectItem>
            <SelectItem value="DE">Germany</SelectItem>
            <SelectItem value="FR">France</SelectItem>
            <SelectItem value="AU">Australia</SelectItem>
            <SelectItem value="JP">Japan</SelectItem>
            <SelectItem value="SG">Singapore</SelectItem>
          </SelectContent>
        </Select>
        {shippingErrors?.country && (
          <p className="text-xs text-destructive">{shippingErrors.country.message}</p>
        )}
      </div>
    </div>
  );
}
