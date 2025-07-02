import { mockHttpClient } from "./httpClient"
import { API_ENDPOINTS } from "./config"

export interface User {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export interface CreateUserData {
  name: string
  email: string
  role: string
}

export interface UsersResponse {
  data: User[]
  total: number
  page: number
  limit: number
}

export const userApi = {
  getUsers: async (params?: { page?: number; limit?: number; search?: string }): Promise<UsersResponse> => {
    const response = await mockHttpClient.get(API_ENDPOINTS.USERS.LIST)
    return response.data
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    const response = await mockHttpClient.post(API_ENDPOINTS.USERS.CREATE, userData)
    return {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString(),
    }
  },

  updateUser: async (id: string, userData: Partial<CreateUserData>): Promise<User> => {
    const response = await mockHttpClient.put(API_ENDPOINTS.USERS.UPDATE(id), userData)
    return response.data
  },

  deleteUser: async (id: string): Promise<void> => {
    await mockHttpClient.delete(API_ENDPOINTS.USERS.DELETE(id))
  },
}
