"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Loader2,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useCartStore } from "@/stores/cart-store";
import { checkoutFormSchema, type CheckoutFormValues } from "@/features/checkout/lib/schema";
import { SHIPPING_METHODS, PAYMENT_METHODS } from "@/features/checkout/data/constants";
import { ShippingForm } from "@/features/checkout/components/shipping-form";
import { DeliveryOptions } from "@/features/checkout/components/delivery-options";
import { PaymentMethods } from "@/features/checkout/components/payment-methods";
import { OrderSummary } from "@/features/checkout/components/order-summary";

interface CheckoutPageClientProps {
  locale?: "vi" | "en";
}

type CheckoutStep = "shipping" | "delivery" | "payment" | "review";

const stepLabels = {
  shipping: { en: "Shipping Address", vi: "Địa chỉ giao hàng" },
  delivery: { en: "Delivery Method", vi: "Phương thức giao hàng" },
  payment: { en: "Payment", vi: "Thanh toán" },
  review: { en: "Review Order", vi: "Xem lại đơn hàng" },
};

const stepIcons: Record<CheckoutStep, typeof MapPin> = {
  shipping: MapPin,
  delivery: Truck,
  payment: CreditCard,
  review: Package,
};

const stepOrder: CheckoutStep[] = ["shipping", "delivery", "payment", "review"];

export function CheckoutPageClient({ locale = "en" }: CheckoutPageClientProps) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      shippingAddress: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      shippingMethod: "standard",
      paymentMethod: "credit-card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
      saveInfo: false,
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const currentStepIndex = stepOrder.indexOf(currentStep);

  const getStepFields = (step: CheckoutStep): (keyof CheckoutFormValues)[] => {
    switch (step) {
      case "shipping":
        return ["shippingAddress"];
      case "delivery":
        return ["shippingMethod"];
      case "payment":
        return ["paymentMethod", "cardNumber", "cardName", "expiryDate", "cvv"];
      default:
        return [];
    }
  };

  const goToStep = async (step: CheckoutStep) => {
    const targetIndex = stepOrder.indexOf(step);
    const fieldsToValidate: (keyof CheckoutFormValues)[] = [];

    // Validate all steps up to the target
    for (let i = 0; i < targetIndex; i++) {
      fieldsToValidate.push(...getStepFields(stepOrder[i]));
    }

    if (fieldsToValidate.length > 0) {
      const isStepValid = await form.trigger(fieldsToValidate);
      if (!isStepValid) return;
    }

    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = async () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= stepOrder.length) return;

    const fieldsToValidate = getStepFields(currentStep);
    const isValid = await form.trigger(fieldsToValidate);
    if (!isValid) return;

    setCurrentStep(stepOrder[nextIndex]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    const isValid = await form.trigger();
    if (!isValid) return;

    setIsSubmitting(true);

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSuccess(true);
    clearCart();
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" strokeWidth={1} />
          <h2 className="mt-4 text-xl font-semibold">
            {locale === "vi" ? "Giỏ hàng trống" : "Your cart is empty"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {locale === "vi"
              ? "Thêm sản phẩm vào giỏ hàng để tiến hành thanh toán."
              : "Add some items to your cart before checking out."}
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">
              {locale === "vi" ? "Tiếp tục mua sắm" : "Continue Shopping"}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-md text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
            <ShoppingBag className="h-8 w-8 text-green-600 dark:text-green-400" strokeWidth={1.5} />
          </div>
          <h2 className="mt-6 text-2xl font-bold tracking-tight">
            {locale === "vi" ? "Đặt hàng thành công!" : "Order Placed Successfully!"}
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            {locale === "vi"
              ? "Cảm ơn bạn đã mua hàng. Chúng tôi sẽ gửi email xác nhận chi tiết đơn hàng."
              : "Thank you for your purchase! We'll send you a confirmation email with your order details."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/products">
                {locale === "vi" ? "Tiếp tục mua sắm" : "Continue Shopping"}
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                {locale === "vi" ? "Về trang chủ" : "Go to Homepage"}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {/* Page Header */}
        <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground sm:mb-8">
          <Link href="/" className="transition-colors hover:text-foreground">
            {locale === "vi" ? "Trang chủ" : "Home"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          <Link href="/cart" className="transition-colors hover:text-foreground">
            {locale === "vi" ? "Giỏ hàng" : "Cart"}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span className="text-foreground">
            {locale === "vi" ? "Thanh toán" : "Checkout"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* Left Column — Form Steps */}
          <div className="min-w-0">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {stepOrder.map((step, index) => {
                  const StepIcon = stepIcons[step];
                  const isActive = step === currentStep;
                  const isCompleted = index < currentStepIndex;

                  return (
                    <button
                      key={step}
                      type="button"
                      onClick={() => {
                        if (isCompleted) {
                          goToStep(step);
                        }
                      }}
                      className={cn(
                        "flex flex-col items-center gap-1.5",
                        isCompleted && "cursor-pointer",
                        !isCompleted && !isActive && "cursor-default"
                      )}
                      disabled={!isCompleted && !isActive}
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all duration-200 sm:h-10 sm:w-10",
                          isCompleted &&
                            "border-foreground bg-foreground text-background",
                          isActive &&
                            "border-foreground bg-background text-foreground",
                          !isCompleted &&
                            !isActive &&
                            "border-muted-foreground/30 text-muted-foreground/50"
                        )}
                      >
                        {isCompleted ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="h-4 w-4 sm:h-5 sm:w-5">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <StepIcon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.5} />
                        )}
                      </div>
                      <span
                        className={cn(
                          "hidden text-xs font-medium sm:block",
                          isCompleted && "text-foreground",
                          isActive && "text-foreground",
                          !isCompleted && !isActive && "text-muted-foreground/50"
                        )}
                      >
                        {locale === "vi"
                          ? stepLabels[step].vi
                          : stepLabels[step].en}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <div className="mt-3 h-1 w-full rounded-full bg-muted sm:mt-4">
                <motion.div
                  layout
                  className="h-full rounded-full bg-foreground transition-all duration-300"
                  style={{
                    width: `${((currentStepIndex) / (stepOrder.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Step Content */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                      <MapPin className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {locale === "vi" ? "Địa chỉ giao hàng" : "Shipping Address"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {locale === "vi"
                          ? "Nhập thông tin nhận hàng của bạn"
                          : "Enter your delivery information"}
                      </p>
                    </div>
                  </div>
                  <ShippingForm locale={locale} />
                </div>
              )}

              {/* Delivery Step */}
              {currentStep === "delivery" && (
                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                      <Truck className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {locale === "vi" ? "Phương thức giao hàng" : "Delivery Method"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {locale === "vi"
                          ? "Chọn phương thức vận chuyển phù hợp"
                          : "Choose your preferred shipping method"}
                      </p>
                    </div>
                  </div>
                  <DeliveryOptions locale={locale} />
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground text-background">
                      <CreditCard className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold tracking-tight">
                        {locale === "vi" ? "Thanh toán" : "Payment"}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {locale === "vi"
                          ? "Chọn phương thức thanh toán"
                          : "Select your payment method"}
                      </p>
                    </div>
                  </div>
                  <PaymentMethods locale={locale} />
                </div>
              )}

              {/* Review Step */}
              {currentStep === "review" && (
                <div className="space-y-5">
                  {/* Shipping Address Review */}
                  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold">
                        {locale === "vi" ? "Địa chỉ giao hàng" : "Shipping Address"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep("shipping")}
                        className="text-xs font-medium text-muted-foreground underline transition-colors hover:text-foreground"
                      >
                        {locale === "vi" ? "Sửa" : "Edit"}
                      </button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        {form.watch("shippingAddress.firstName")}{" "}
                        {form.watch("shippingAddress.lastName")}
                      </p>
                      <p>{form.watch("shippingAddress.address")}</p>
                      {form.watch("shippingAddress.apartment") && (
                        <p>{form.watch("shippingAddress.apartment")}</p>
                      )}
                      <p>
                        {form.watch("shippingAddress.city")},{" "}
                        {form.watch("shippingAddress.state")}{" "}
                        {form.watch("shippingAddress.zipCode")}
                      </p>
                      <p className="mt-1">{form.watch("shippingAddress.email")}</p>
                      <p>{form.watch("shippingAddress.phone")}</p>
                    </div>
                  </div>

                  {/* Delivery Method Review */}
                  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold">
                        {locale === "vi" ? "Phương thức giao hàng" : "Delivery Method"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep("delivery")}
                        className="text-xs font-medium text-muted-foreground underline transition-colors hover:text-foreground"
                      >
                        {locale === "vi" ? "Sửa" : "Edit"}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {locale === "vi"
                        ? SHIPPING_METHODS.find((m) => m.id === form.watch("shippingMethod"))
                            ?.labelVi
                        : SHIPPING_METHODS.find((m) => m.id === form.watch("shippingMethod"))
                            ?.label}
                    </p>
                  </div>

                  {/* Payment Review */}
                  <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <h3 className="text-sm font-semibold">
                        {locale === "vi" ? "Thanh toán" : "Payment"}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setCurrentStep("payment")}
                        className="text-xs font-medium text-muted-foreground underline transition-colors hover:text-foreground"
                      >
                        {locale === "vi" ? "Sửa" : "Edit"}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {form.watch("paymentMethod") === "credit-card"
                        ? `**** **** **** ${form
                            .watch("cardNumber")
                            .replace(/\s/g, "")
                            .slice(-4)}`
                        : locale === "vi"
                        ? PAYMENT_METHODS.find((m) => m.id === form.watch("paymentMethod"))
                            ?.labelVi
                        : PAYMENT_METHODS.find((m) => m.id === form.watch("paymentMethod"))
                            ?.label}
                    </p>
                  </div>

                  {/* Save Info Checkbox */}
                  <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-4">
                    <Checkbox
                      checked={form.watch("saveInfo")}
                      onCheckedChange={(checked: boolean | "indeterminate") =>
                        form.setValue("saveInfo", checked === true)
                      }
                      className="mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {locale === "vi"
                          ? "Lưu thông tin cho lần sau"
                          : "Save info for next time"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {locale === "vi"
                          ? "Lưu địa chỉ và thông tin thanh toán an toàn để thanh toán nhanh hơn."
                          : "Securely save your address and payment info for faster checkout."}
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </motion.div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div>
                {currentStepIndex > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => goToStep(stepOrder[currentStepIndex - 1])}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                    {locale === "vi" ? "Quay lại" : "Back"}
                  </Button>
                )}
              </div>

              {currentStepIndex < stepOrder.length - 1 && (
                <Button onClick={handleNext} className="gap-2">
                  {locale === "vi" ? "Tiếp theo" : "Continue"}
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </Button>
              )}

              {currentStep === "review" && (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                      {locale === "vi" ? "Đang xử lý..." : "Processing..."}
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" strokeWidth={1.5} />
                      {locale === "vi"
                        ? "Đặt hàng"
                        : "Place Order"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Right Column — Order Summary (Sticky) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <OrderSummary locale={locale} />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}