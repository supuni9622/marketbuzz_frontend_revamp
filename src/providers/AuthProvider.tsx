import { useEffect, ReactElement } from "react";
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@/constants"; 
import GTMService from "@/services/GTMService";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setToken = useAuthStore((state) => state.setToken);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const token = useAuthStore((state) => state.token);
  const organizationId = useAuthStore((state) => state.organizationId);
  const role = useAuthStore((state) => state.role);
  const initCompleted = useAuthStore((state) => state.initCompleted);

  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const accessToken = searchParams.get('token');
    console.debug("accessToken", accessToken)
    console.debug("location", window.location.pathname)
    if (accessToken) {
      setToken(accessToken);
      sessionStorage.setItem("accessToken", accessToken);
    } else if (sessionStorage.getItem("accessToken")) {
      setToken(sessionStorage.getItem("accessToken") ?? "");
    } else if (!token) {
      logoutUser();
      router.push("/login");
    }
  }, [setToken, logoutUser, searchParams]);

  useEffect(() => {
    if (initCompleted) {
      if (!isLoggedIn()) {
        router.push("/login");
      } else if (!organizationId && role === UserRole.SUPERADMIN) {
        router.push("/admin/switch");
        GTMService.loginEvent({ organizationId: organizationId, role: role });
      } else {
        GTMService.loginEvent({ organizationId: organizationId, role: role });
      }
    }
  }, [isLoggedIn, router, organizationId, role, initCompleted]);

  return children;
};

export default AuthProvider;
