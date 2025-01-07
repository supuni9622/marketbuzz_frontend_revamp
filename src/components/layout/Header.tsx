'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CreditCard, ChevronDown, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const logoutUser = useAuthStore((state) => state.logoutUser);

  const handleLogout = React.useCallback(() => {
    logoutUser();
    router.push('/login');
  }, [logoutUser, router]);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center space-x-4">
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">10,262 Credits</span>
          <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500">
            Buy Credits
          </button>
        </div>
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src="https://picsum.photos/200"
                alt="User avatar"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 48px"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">User</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
