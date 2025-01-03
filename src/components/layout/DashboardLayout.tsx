'use client'

import React from 'react'
import { MainLayout } from './MainLayout'

interface DashboardLayoutProps {
  children: React.ReactNode
  showFilters?: boolean
}

export function DashboardLayout({ children, showFilters = false }: DashboardLayoutProps) {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-6">
        {showFilters && (
          <aside className="w-full lg:w-64 shrink-0">
            <div className="sticky top-0 bg-white rounded-lg border p-4">
              <h3 className="font-medium text-gray-900 mb-3">Filters</h3>
              {/* Filter content will be passed as children to a Filters component */}
            </div>
          </aside>
        )}
        <div className="flex-1">
          <div className="bg-white rounded-lg border p-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {/* Quick actions will be passed as children to a QuickActions component */}
            </div>
          </div>
          {children}
        </div>
      </div>
    </MainLayout>
  )
} 