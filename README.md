# # 🧠 Project README: Scalable Frontend with Next.js

This project demonstrates a **clean, modular, and scalable** frontend architecture using **Next.js (App Router)**, **TailwindCSS**, **React Query**, and **Axios**. It is designed to serve as a template and learning guide for developers working on real-world frontend projects that consume APIs from backend microservices.

---

## 📁 Folder Structure Overview

```bash
my-app/
├── app/                    # App Router structure for pages
│   ├── (auth)/login/       # Public auth pages
│   └── dashboard/          # Protected dashboard pages
│       ├── users/
│       ├── bookings/
│       └── settings/
│
├── components/             # Reusable UI & shared layout components
│   ├── ui/                 # Atomic UI elements (Button, Input, etc.)
│   └── shared/             # Layout components like Sidebar, Topbar
│
├── hooks/                  # Custom React hooks using React Query
│   ├── useAuth.ts
│   ├── useUsers.ts
│   └── useBookings.ts
│
├── lib/                    # App logic and API layer
│   ├── api/                # Centralized API client + modules
│   │   ├── config.ts       # Base URL and versioning
│   │   ├── httpClient.ts   # Axios instance with token injection
│   │   ├── auth.ts
│   │   ├── user.ts
│   │   └── booking.ts
│   └── providers/          # Context and query provider setup
│
├── utils/                  # Utility functions and constants
│   ├── formatters.ts
│   └── constants.ts
└── public/                 # Static assets
```

---

## 🔧 Tech Stack

### Frontend

- **Next.js (App Router)** – for routing
- **React 18** – for building UI
- **TailwindCSS** – for styling
- **React Query** – for data-fetching and caching
- **Axios** – for HTTP client abstraction

### Development Tools

- **TypeScript** – for static typing
- **ESLint & Prettier** – for linting and formatting
- **PostCSS** – Tailwind processing
- **Environment Variables** – for API config

---

## 🧠 Architecture Strategy

We follow a strict **separation of concerns** strategy. The application is broken into domains such as `auth`, `users`, and `bookings`, and each domain has its own API methods and custom React Query hooks. All communication to the backend is centralized through the `lib/api/` layer, and components access data only through hooks.

### 🧩 Centralized API Layer (`lib/api/`)

- Each domain (auth, user, booking, etc.) has a dedicated file
- Uses a single Axios instance defined in `httpClient.ts`
- Versioning and base URL are managed in `config.ts`

```ts
// lib/api/config.ts
export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL;
export const apiRoute = (path: string) => `${BASE_API_URL}/v1/${path}`;
```

```ts
// lib/api/httpClient.ts
const httpClient = axios.create({
  baseURL: BASE_API_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### 🔁 Custom Hooks Pattern (`hooks/`)

- Every API interaction should be wrapped in a custom hook
- Hooks use React Query’s `useQuery` or `useMutation`
- Promotes code reuse, testability, and clean separation

```ts
// hooks/useUsers.ts
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: api.user.getAllUsers,
  });
};
```

```ts
// hooks/useLogin.ts
export const useLogin = () => {
  return useMutation({
    mutationFn: api.auth.login,
  });
};
```

### 🧪 Benefits

- Hooks abstract away loading/error/success states
- Components stay clean and focused on rendering
- All network logic is centralized and maintainable

---

## 🔄 Example Integration Flow: Fetching Users

```ts
// lib/api/user.ts
export const getAllUsers = async () => {
  return (await httpClient.get(apiRoute("users"))).data;
};
```

```ts
// hooks/useUsers.ts
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: api.user.getAllUsers,
  });
};
```

```tsx
// app/dashboard/users/page.tsx
const { data: users, isLoading } = useUsers();

return (
  <div>
    {isLoading ? "Loading..." : users.map((u) => <UserCard key={u.id} {...u} />)}
  </div>
);
```

---

## ✍️ When and How to Write Custom Hooks

### ✅ Create a custom hook if:

- You use the API data in more than one component
- You need to cache the response
- You want to abstract away loading/error logic
- You are performing mutations (e.g., login, booking, update)

### ❌ Avoid putting raw axios/fetch logic inside components

---

## 🚀 Extending the Codebase with New Features

To add a new domain (e.g. "Messages"):

1. Create `lib/api/messages.ts`
2. Create `hooks/useMessages.ts`
3. Create page: `app/dashboard/messages/page.tsx`
4. Render UI using `useMessages()`
5. Add the route in `Sidebar.tsx`

---

## 📚 Resources

- [React Query Docs](https://tanstack.com/query/latest)
- [Axios Docs](https://axios-http.com/)
- [Next.js App Router](https://nextjs.org/docs/app/building-your-application/routing)
- [TailwindCSS](https://tailwindcss.com/)

---

## 👋 Final Notes

- `app/` = route-based folder structure
- `page.tsx` = main route entry
- `layout.tsx` = shared layout (e.g., sidebar, header)
- Data fetching should **always** be done via custom hooks
- Centralize and encapsulate logic for long-term scalability

Stick to this pattern and your frontend will stay clean, maintainable, and enterprise-ready. 💡

Happy building 🚀



