import { create } from "zustand"
import { persist } from "zustand/middleware"

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
  addAddress: (address: Omit<Address, "id" | "isDefault">) => void
  updateAddress: (id: string, data: Partial<Address>) => void
  removeAddress: (id: string) => void
  setDefault: (id: string) => void
}

const defaultAddresses: Address[] = [
  {
    id: "1",
    type: "home",
    name: "Nguyễn Văn A",
    phone: "0901 234 567",
    street: "123 Nguyễn Huệ",
    ward: "Phường Bến Nghé",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: "2",
    type: "office",
    name: "Nguyễn Văn A",
    phone: "0909 888 777",
    street: "456 Lê Lợi",
    ward: "Phường 3",
    district: "Quận 3",
    city: "TP. Hồ Chí Minh",
    isDefault: false,
  },
]

export const useAddressesStore = create<AddressesState>()(
  persist(
    (set) => ({
      items: defaultAddresses,

      addAddress: (data) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...data,
              id: String(Date.now()),
              isDefault: state.items.length === 0,
            },
          ],
        })),

      updateAddress: (id, data) =>
        set((state) => ({
          items: state.items.map((a) =>
            a.id === id ? { ...a, ...data } : a,
          ),
        })),

      removeAddress: (id) =>
        set((state) => ({
          items: state.items.filter((a) => a.id !== id),
        })),

      setDefault: (id) =>
        set((state) => ({
          items: state.items.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),
    }),
    {
      name: "helmetpro-addresses",
    },
  ),
)
