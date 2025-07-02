import { mockHttpClient } from "./httpClient"
import { API_ENDPOINTS } from "./config"

export interface Booking {
  id: string
  userId: string
  userName: string
  date: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  service: string
}

export interface CreateBookingData {
  userId: string
  date: string
  service: string
}

export interface BookingsResponse {
  data: Booking[]
  total: number
  page: number
  limit: number
}

export const bookingApi = {
  getBookings: async (params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }): Promise<BookingsResponse> => {
    const response = await mockHttpClient.get(API_ENDPOINTS.BOOKINGS.LIST)
    return response.data
  },

  createBooking: async (bookingData: CreateBookingData): Promise<Booking> => {
    const response = await mockHttpClient.post(API_ENDPOINTS.BOOKINGS.CREATE, bookingData)
    return {
      id: Date.now().toString(),
      ...bookingData,
      userName: "New User",
      status: "pending",
    }
  },

  updateBooking: async (id: string, bookingData: Partial<CreateBookingData>): Promise<Booking> => {
    const response = await mockHttpClient.put(API_ENDPOINTS.BOOKINGS.UPDATE(id), bookingData)
    return response.data
  },

  deleteBooking: async (id: string): Promise<void> => {
    await mockHttpClient.delete(API_ENDPOINTS.BOOKINGS.DELETE(id))
  },
}
