"use client"

import { useEffect, useRef } from "react"
import { useAuthStore } from "@/stores/auth-store"
import { useAddressesStore } from "@/stores/addresses-store"
import { fetchAddresses } from "@/features/addresses/api/addresses-api"

export function useAddressesSync() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)
  const setItems = useAddressesStore((s) => s.setItems)
  const prevAuthRef = useRef(isAuthenticated)

  useEffect(() => {
    const becameAuthenticated = isAuthenticated && !prevAuthRef.current

    if (becameAuthenticated && user?.id) {
      fetchAddresses(user.id)
        .then((data) => {
          setItems(
            data.addresses.map((a) => {
              const parts = (a.apartment || "").split(", ")
              return {
                id: a.id,
                type: a.type,
                name: a.name,
                phone: a.phone,
                street: a.street,
                ward: parts[0] || "",
                district: parts[1] || a.state,
                city: a.city,
                isDefault: a.isDefault,
              }
            }),
          )
        })
        .catch(() => {})
    }

    prevAuthRef.current = isAuthenticated
  }, [isAuthenticated, user?.id, setItems])
}
