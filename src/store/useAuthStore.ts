import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  name: string
  merchantId?: string
  cloverToken?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async () => {
        try {
          // TODO: Implement Clover OAuth flow
          // This is a placeholder implementation
          // You'll need to:
          // 1. Redirect to Clover OAuth page
          // 2. Handle the OAuth callback
          // 3. Exchange code for access token
          // 4. Get user info from Clover API
          
          // Simulating successful Clover login
          const user = {
            id: '1',
            email: 'merchant@example.com',
            name: 'Merchant User',
            merchantId: 'EKCP62Z5XBKW2',
            cloverToken: 'sandbox_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
          }

          set({
            user,
            token: user.cloverToken,
            isAuthenticated: true,
          })
        } catch (error) {
          throw error
        }
      },
      logout: () => {
        // TODO: Implement Clover logout if needed
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
) 