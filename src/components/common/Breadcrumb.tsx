'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export function Breadcrumb() {
  const pathname = usePathname()
  const paths = pathname.split('/').filter(Boolean)
  
  // Convert path to breadcrumb label
  const getLabel = (path: string) => {
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  // Get full path for each breadcrumb level
  const getHref = (index: number) => {
    return '/' + paths.slice(0, index + 1).join('/')
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      {paths.map((path, index) => (
        <React.Fragment key={path}>
          {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400" />}
          <Link 
            href={getHref(index)}
            className={index === paths.length - 1 ? 'text-gray-400' : 'text-gray-600 hover:text-gray-900'}
          >
            {getLabel(path)}
          </Link>
        </React.Fragment>
      ))}
    </div>
  )
} 