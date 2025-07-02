import { mockHttpClient } from "./httpClient"
import { API_ENDPOINTS } from "./config"

export interface LoginCredentials {
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  role: string
}

export interface AuthResponse {
  user: User
  token: string
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await mockHttpClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)
    return {
      user: {
        id: "1",
        name: "John Doe",
        email: credentials.email,
        role: "Admin",
      },
      token: "mock-jwt-token",
    }
  },

  logout: async (): Promise<void> => {
    await mockHttpClient.post(API_ENDPOINTS.AUTH.LOGOUT, {})
    localStorage.removeItem("auth_token")
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await mockHttpClient.get(API_ENDPOINTS.AUTH.ME)
    return response.data
  },
}
