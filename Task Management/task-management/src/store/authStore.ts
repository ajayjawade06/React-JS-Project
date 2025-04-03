import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email: string, password: string) => {
        // TODO: Implement actual API call
        // For now, simulate successful login
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            email,
            name: 'Test User',
          },
        })
      },
      signup: async (email: string, password: string, name: string) => {
        // TODO: Implement actual API call
        // For now, simulate successful signup
        set({
          isAuthenticated: true,
          user: {
            id: '1',
            email,
            name,
          },
        })
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        })
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage
    }
  )
)