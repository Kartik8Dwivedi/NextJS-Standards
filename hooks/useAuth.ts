"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { authApi } from "@/lib/api/auth"
import { useRouter } from "next/navigation"

export const useAuth = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("auth_token", data.token)
      queryClient.setQueryData(["auth", "user"], data.user)
      router.push("/dashboard")
    },
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear()
      router.push("/login")
    },
  })

  const userQuery = useQuery({
    queryKey: ["auth", "user"],
    queryFn: authApi.getCurrentUser,
    enabled: !!localStorage.getItem("auth_token"),
  })

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    user: userQuery.data,
    isLoading: loginMutation.isPending || logoutMutation.isPending || userQuery.isLoading,
    isAuthenticated: !!userQuery.data,
    loginError: loginMutation.error,
  }
}
