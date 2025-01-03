'use client'

import React from 'react'
import { Users, DollarSign, UserCheck, ShoppingCart } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { MetricCard } from '@/components/layout/MetricCard'

const metrics = [
  {
    title: 'New Customers',
    value: '1,234',
    change: 12.5,
    icon: Users,
  },
  {
    title: 'Sales',
    value: '$45,678',
    change: 8.2,
    icon: DollarSign,
  },
  {
    title: 'Return Customers',
    value: '789',
    change: -2.4,
    icon: UserCheck,
  },
  {
    title: 'Transaction Count',
    value: '2,345',
    change: 5.7,
    icon: ShoppingCart,
  },
]

export default function DashboardPage() {
  return (
    <>
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Analytics Overview</h1>
            <p className="mt-1 text-sm text-gray-500">Last 28 Days Performance</p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>
        </main>
      </div>
    </>
  )
}
