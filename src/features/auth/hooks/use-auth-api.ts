import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "@/stores/auth-store"
import { useCartStore } from "@/stores/cart-store"
import { loginApi, registerApi, logoutApi } from "@/features/auth/api/auth-api"

export function useLogin() {
  const login = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      login({ id: data.user.id, name: data.user.name, email: data.user.email }, data.token)
    },
  })
}

export function useRegister() {
  const login = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      login({ id: data.user.id, name: data.user.name, email: data.user.email }, data.token)
    },
  })
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout)
  const clearCart = useCartStore((s) => s.clearCart)

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      logout()
      clearCart()
    },
  })
}
