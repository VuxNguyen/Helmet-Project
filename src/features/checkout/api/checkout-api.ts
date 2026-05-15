import axios from "axios"

export interface CheckoutRequest {
  shipping: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    apartment?: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  shippingMethod: string
  paymentMethod: string
  items: {
    productId: string
    name: string
    quantity: number
    price: number
  }[]
}

export interface CheckoutResponse {
  orderId: string
  orderNumber: string
  status: string
  total: number
  createdAt: string
}

export function submitCheckout(data: CheckoutRequest) {
  return axios.post<CheckoutResponse>("/api/checkout", data).then((r) => r.data)
}
