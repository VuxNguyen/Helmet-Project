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

export async function loginApi(data: LoginRequest) {
  try {
    const response = await axios.post<AuthResponse>("/api/auth/login", data)
    return response.data
  } catch (error: unknown) {
    const axiosErr = error as {
      response?: { data?: { error?: string }; status?: number }
      message?: string
    }
    const message =
      axiosErr.response?.data?.error ??
      axiosErr.message ??
      "Đã xảy ra lỗi, vui lòng thử lại"
    throw new Error(message)
  }
}

export function registerApi(data: RegisterRequest) {
  return axios.post<AuthResponse>("/api/auth/register", data).then((r) => r.data)
}

export function logoutApi() {
  return axios.post("/api/auth/logout").then((r) => r.data)
}
