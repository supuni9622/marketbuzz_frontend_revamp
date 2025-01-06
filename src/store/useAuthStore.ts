import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: object
  token: string
  role: string
  organizationId: string
  initCompleted: boolean
  setUser: (user: object) => void
  setToken: (token: string) => void
  logoutUser: () => void
  isLoggedIn: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {},
      token: '',
      role: '',
      organizationId: '',
      initCompleted: false,
      setUser: (user: object) => set({ user }),
      setToken: (token: string) => {
        set({ token, initCompleted: true })
      },
      logoutUser: () => {
        sessionStorage.removeItem('accessToken')
        set({
          user: {},
          token: '',
          role: '',
          organizationId: '',
          initCompleted: true
        })
      },
      isLoggedIn: () => {
        const state = get()
        return !!state.token
      }
    }),
    {
      name: 'auth-storage'
    }
  )
) 