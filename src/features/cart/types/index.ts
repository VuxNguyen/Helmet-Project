/**
 * Types for the cart feature.
 */

export interface CouponCode {
  code: string
  discount: number
  type: "percentage" | "fixed"
  minPurchase?: number
}

export interface CartSummaryData {
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  freeShippingThreshold: number
}