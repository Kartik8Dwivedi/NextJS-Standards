"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { userApi, type CreateUserData } from "@/lib/api/user"

export const useUsers = (params?: { page?: number; limit?: number; search?: string }) => {
  const queryClient = useQueryClient()

  const usersQuery = useQuery({
    queryKey: ["users", params],
    queryFn: () => userApi.getUsers(params),
  })

  const createUserMutation = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateUserData> }) => userApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  const deleteUserMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  return {
    users: usersQuery.data?.data || [],
    total: usersQuery.data?.total || 0,
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    createUser: createUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
  }
}
