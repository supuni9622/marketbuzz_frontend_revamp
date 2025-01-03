'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Megaphone, BarChart } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { name: 'Reports', href: '/reports', icon: BarChart },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-60 flex-col border-r bg-white">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-xl font-bold text-gray-900">MarketBuzz</h1>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-md px-3 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon
                className={cn(
                  'mr-3 h-5 w-5 flex-shrink-0',
                  isActive ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-900'
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
} 