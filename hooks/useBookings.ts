"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { bookingApi, type CreateBookingData } from "@/lib/api/booking"

export const useBookings = (params?: {
  page?: number
  limit?: number
  status?: string
  search?: string
}) => {
  const queryClient = useQueryClient()

  const bookingsQuery = useQuery({
    queryKey: ["bookings", params],
    queryFn: () => bookingApi.getBookings(params),
  })

  const createBookingMutation = useMutation({
    mutationFn: bookingApi.createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })

  const updateBookingMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateBookingData> }) => bookingApi.updateBooking(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })

  const deleteBookingMutation = useMutation({
    mutationFn: bookingApi.deleteBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] })
    },
  })

  return {
    bookings: bookingsQuery.data?.data || [],
    total: bookingsQuery.data?.total || 0,
    isLoading: bookingsQuery.isLoading,
    error: bookingsQuery.error,
    createBooking: createBookingMutation.mutate,
    updateBooking: updateBookingMutation.mutate,
    deleteBooking: deleteBookingMutation.mutate,
    isCreating: createBookingMutation.isPending,
    isUpdating: updateBookingMutation.isPending,
    isDeleting: deleteBookingMutation.isPending,
  }
}
