import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {Utility} from "@/utility/Utility";

type AuthStore = {
  user: object;
  setUser: (user: object) => void;
  token: string;
  role: string;
  organizationId: string;
  initCompleted: boolean;
  setToken: (token: string) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: {},
      token: "",
      role: "",
      organizationId: "",
      initCompleted: false,
      setUser: (user: object) => set({ user }),
      setToken: (token: string) => {
        if (token) {
          try {
            const decodedToken = Utility.decodeToken(token);
            set({
              token,
              role: decodedToken.user.role,
              organizationId: decodedToken.user.organizationId,
              initCompleted: true
            });
          } catch (error) {
            console.error("Failed to decode token:", error);
            set({ token: "", initCompleted: true });
          }
        } else {
          set({ token: "", initCompleted: true });
        }
      },
      logoutUser: () => {
        sessionStorage.removeItem("accessToken");
        set({
          user: {},
          token: "",
          role: "",
          organizationId: "",
          initCompleted: true
        });
      },
      isLoggedIn: () => {
        const state = get();
        return !!state.token;
      }
    }),
    {
      name: "auth-storage"
    }
  )
);
