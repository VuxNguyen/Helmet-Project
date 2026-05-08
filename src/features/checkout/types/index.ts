/**
 * Types for the checkout feature.
 */

export type ShippingMethod = "standard" | "express" | "next-day";

export interface ShippingMethodOption {
  id: ShippingMethod;
  label: string;
  labelVi: string;
  description: string;
  descriptionVi: string;
  cost: number;
  estimatedDays: string;
  estimatedDaysVi: string;
}

export type PaymentMethod = "credit-card" | "paypal" | "stripe";

export interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  labelVi: string;
  icon: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;
  saveInfo: boolean;
}

export interface CheckoutSummary {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}