'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { UserRole } from '@/constants';
import GTMService from '@/services/GTMService';
import Cookie from 'js-cookie'; 

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setToken = useAuthStore((state) => state.setToken);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const token = useAuthStore((state) => state.token);
  const organizationId = useAuthStore((state) => state.organizationId);
  const role = useAuthStore((state) => state.role);
  const initCompleted = useAuthStore((state) => state.initCompleted);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const storeToken = (token: string) => {
    Cookie.set('accessToken', token, { expires: 0.25, path: '/' }); // Set cookie with 6 hours expiry
  };

  useEffect(() => {
    const accessToken = searchParams.get('token');
    if (accessToken) {
      setToken(accessToken);
      sessionStorage.setItem("accessToken", accessToken);
      storeToken(accessToken);
    } else if (!!sessionStorage.getItem("accessToken")) {
        setToken(sessionStorage.getItem("accessToken") ?? "");
        storeToken(sessionStorage.getItem("accessToken") ?? "");
      } else {
        logoutUser();
      }
  }, [setToken, logoutUser, router, pathname, storeToken]);

  useEffect(() => {
    if (initCompleted) {
      if (!isLoggedIn()) {
        router.push('/login');
      } else if (!organizationId && role === UserRole.SUPERADMIN) {
        router.push('/admin/switch');
        GTMService.loginEvent({ organizationId, role });
      } else {
        GTMService.loginEvent({ organizationId, role });
      }
    }
  }, [isLoggedIn, router, organizationId, role, initCompleted]);

  return <>{children}</>;
};

export default AuthProvider;
