'use client'

import React from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
} 