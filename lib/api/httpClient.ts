import axios from "axios"
import { API_CONFIG } from "./config"

export const httpClient = axios.create({
  baseURL: `${API_CONFIG.BASE_URL}/${API_CONFIG.VERSION}`,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// Mock delay for development
const mockDelay = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock HTTP client for development
export const mockHttpClient = {
  get: async (url: string) => {
    await mockDelay()
    return { data: getMockData(url) }
  },
  post: async (url: string, data: any) => {
    await mockDelay()
    return { data: { success: true, data } }
  },
  put: async (url: string, data: any) => {
    await mockDelay()
    return { data: { success: true, data } }
  },
  delete: async (url: string) => {
    await mockDelay()
    return { data: { success: true } }
  },
}

function getMockData(url: string) {
  if (url.includes("/users")) {
    return {
      data: [
        { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", createdAt: "2024-01-01" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", createdAt: "2024-01-02" },
        { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Moderator", createdAt: "2024-01-03" },
      ],
      total: 3,
      page: 1,
      limit: 10,
    }
  }

  if (url.includes("/bookings")) {
    return {
      data: [
        {
          id: "1",
          userId: "1",
          userName: "John Doe",
          date: "2024-02-15",
          status: "confirmed",
          service: "Consultation",
        },
        { id: "2", userId: "2", userName: "Jane Smith", date: "2024-02-20", status: "pending", service: "Meeting" },
        { id: "3", userId: "3", userName: "Bob Johnson", date: "2024-02-25", status: "completed", service: "Workshop" },
      ],
      total: 3,
      page: 1,
      limit: 10,
    }
  }

  if (url.includes("/auth/me")) {
    return {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    }
  }

  return { data: [] }
}
