'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard } from 'lucide-react';
import { useOrganizationStore } from '@/store/useOrganizationStore';
import { ProfileDropdown } from '@/components/profile/ProfileDropdown';

export function Header() {
  const router = useRouter();
  const credits = useOrganizationStore((state) => state.credits);

  const handleBuyCredits = () => {
    router.push('/billing');
  };

  return (
    <header className="h-16 border-b bg-white">
      <div className="flex h-full items-center justify-end px-6">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">{credits} Buzz Credits</span>
            <button 
              onClick={handleBuyCredits}
              className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500"
            >
              Buy Credits
            </button>
          </div>
          
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
