import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useAuthStore } from "@/stores/auth-store"
import {
  createAddress as apiCreateAddress,
  updateAddress as apiUpdateAddress,
  deleteAddress as apiDeleteAddress,
  setDefaultAddress as apiSetDefaultAddress,
} from "@/features/addresses/api/addresses-api"

export interface Address {
  id: string
  type: "home" | "office"
  name: string
  phone: string
  street: string
  ward: string
  district: string
  city: string
  isDefault: boolean
}

interface AddressesState {
  items: Address[]
  addAddress: (data: Omit<Address, "id" | "isDefault">) => void
  updateAddress: (id: string, data: Partial<Address>) => void
  removeAddress: (id: string) => void
  setDefault: (id: string) => void
  setItems: (items: Address[]) => void
}

function getAuth() {
  return useAuthStore.getState()
}

export const useAddressesStore = create<AddressesState>()(
  persist(
    (set, get) => ({
      items: [],

      setItems: (items) => set({ items }),

      addAddress: (data) => {
        const { isAuthenticated, user } = getAuth()
        if (isAuthenticated) {
          apiCreateAddress({
            userId: user?.id,
            name: data.name,
            phone: data.phone,
            street: data.street,
            apartment: `${data.ward}, ${data.district}`,
            city: data.city,
            state: data.district,
            zipCode: "00000",
            country: "VN",
            type: data.type,
          }).catch(() => {})
        }
        set((state) => ({
          items: [
            ...state.items,
            { ...data, id: String(Date.now()), isDefault: state.items.length === 0 },
          ],
        }))
      },

      updateAddress: (id, data) => {
        if (getAuth().isAuthenticated) {
          apiUpdateAddress(id, {
            ...data,
            apartment: data.ward ? `${data.ward}, ${data.district || ""}` : undefined,
          }).catch(() => {})
        }
        set((state) => ({
          items: state.items.map((a) => (a.id === id ? { ...a, ...data } : a)),
        }))
      },

      removeAddress: (id) => {
        if (getAuth().isAuthenticated) {
          apiDeleteAddress(id).catch(() => {})
        }
        set((state) => ({
          items: state.items.filter((a) => a.id !== id),
        }))
      },

      setDefault: (id) => {
        if (getAuth().isAuthenticated) {
          apiSetDefaultAddress(id).catch(() => {})
        }
        set((state) => ({
          items: state.items.map((a) => ({ ...a, isDefault: a.id === id })),
        }))
      },
    }),
    { name: "helmetpro-addresses" },
  ),
)
