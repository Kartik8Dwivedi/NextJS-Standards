export const USER_ROLES = {
  ADMIN: "Admin",
  MODERATOR: "Moderator",
  USER: "User",
} as const

export const BOOKING_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  USERS: "/dashboard/users",
  BOOKINGS: "/dashboard/bookings",
  SETTINGS: "/dashboard/settings",
} as const
