'use client'

import React from 'react'
import { usePathname } from 'next/navigation'

export default function CampaignsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  
  const getBreadcrumbTitle = (path: string) => {
    switch(path) {
      case 'campaigns':
        return 'Campaigns'
      case 'sms':
        return 'SMS Campaigns'
      case 'automated':
        return 'Automated Campaigns'
      default:
        return path.charAt(0).toUpperCase() + path.slice(1)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumb */}
      <div className="flex justify-end p-4 text-sm">
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <span className="text-gray-600">
              {getBreadcrumbTitle(path)}
            </span>
            {index < paths.length - 1 && (
              <span className="mx-2 text-gray-400">›</span>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Page Title */}
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-semibold text-gray-900">
          {getBreadcrumbTitle(paths[paths.length - 1])}
        </h1>
      </div>

      {/* Page Content */}
      {children}
    </div>
  )
} 