import axios from "axios"

export interface AddressRaw {
  id: string
  userId: string
  name: string
  phone: string
  street: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  type: "home" | "office"
}

export interface AddressesResponse {
  addresses: AddressRaw[]
}

export function fetchAddresses(userId: string) {
  return axios.get<AddressesResponse>(`/api/addresses?userId=${userId}`).then((r) => r.data)
}

export function createAddress(data: {
  userId?: string
  name: string
  phone: string
  street: string
  apartment?: string
  city: string
  state?: string
  zipCode?: string
  country?: string
  isDefault?: boolean
  type: "home" | "office"
}) {
  return axios.post<{ address: AddressRaw }>("/api/addresses", data).then((r) => r.data)
}

export function updateAddress(id: string, data: Record<string, unknown>) {
  return axios.put<{ address: AddressRaw }>(`/api/addresses/${id}`, data).then((r) => r.data)
}

export function deleteAddress(id: string) {
  return axios.delete(`/api/addresses/${id}`).then((r) => r.data)
}

export function setDefaultAddress(id: string) {
  return axios.patch(`/api/addresses/${id}/default`).then((r) => r.data)
}
