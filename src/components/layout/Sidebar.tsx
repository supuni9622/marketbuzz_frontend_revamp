'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Megaphone, BarChart, ChevronRight, ChevronDown, Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard 
  },
  { 
    name: 'Customers', 
    href: '/customers', 
    icon: Users 
  },
  { 
    name: 'Campaigns', 
    href: '/campaigns', 
    icon: Megaphone,
    subItems: [
      { name: 'SMS Campaigns', href: '/campaigns/sms' },
      { name: 'Automated Campaigns', href: '/campaigns/automated' }
    ]
  },
  { 
    name: 'Reports', 
    href: '/reports', 
    icon: BarChart 
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const [expandedItems, setExpandedItems] = React.useState<string[]>([])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    )
  }

  return (
    <div className={cn(
      "flex flex-col border-r bg-white transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-60"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-900">MarketBuzz</h1>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-1.5 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const isExpanded = expandedItems.includes(item.name)
          const Icon = item.icon

          return (
            <div key={item.name}>
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={cn(
                      "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium",
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0",
                      isActive ? "text-gray-900" : "text-gray-400"
                    )} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1">{item.name}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </>
                    )}
                  </button>
                  {!isCollapsed && isExpanded && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className={cn(
                            "block rounded-md py-2 pl-4 pr-3 text-sm font-medium",
                            pathname === subItem.href
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-gray-900" : "text-gray-400"
                  )} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
} 