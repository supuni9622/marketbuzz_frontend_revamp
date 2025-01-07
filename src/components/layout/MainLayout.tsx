'use client'

import React from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import { Breadcrumb } from '../common/Breadcrumb'
import { usePathname } from 'next/navigation'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const currentPage = pathname.split('/').filter(Boolean)[0] || 'Dashboard'
  const pageTitle = currentPage.charAt(0).toUpperCase() + currentPage.slice(1)

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <div className="border-b">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">{pageTitle.toUpperCase()}</h1>
            <Breadcrumb />
          </div>
        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
} 