import axios from "axios"

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    name: string
    email: string
    phone?: string
  }
  token: string
}

export function loginApi(data: LoginRequest) {
  return axios.post<AuthResponse>("/api/auth/login", data).then((r) => r.data)
}

export function registerApi(data: RegisterRequest) {
  return axios.post<AuthResponse>("/api/auth/register", data).then((r) => r.data)
}

export function logoutApi() {
  return axios.post("/api/auth/logout").then((r) => r.data)
}
