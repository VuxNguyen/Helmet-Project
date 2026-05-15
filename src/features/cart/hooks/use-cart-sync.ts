"use client";

import { useEffect, useRef } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useCartStore } from "@/stores/cart-store";
import { fetchCart } from "@/features/cart/api/cart-api";

export function useCartSync() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const setItems = useCartStore((s) => s.setItems);
  const prevAuthRef = useRef(isAuthenticated);

  useEffect(() => {
    const becameAuthenticated = isAuthenticated && !prevAuthRef.current;

    if (becameAuthenticated) {
      fetchCart()
        .then((data) => setItems(data.items))
        .catch(() => {});
    }

    prevAuthRef.current = isAuthenticated;
  }, [isAuthenticated, setItems]);
}
