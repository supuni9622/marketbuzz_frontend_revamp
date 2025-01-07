'use client'

import React from 'react'
import { Users, ShoppingCart, UserCheck, X, ChevronDown } from 'lucide-react'
import { MetricCard } from '@/components/layout/MetricCard'

const metrics = [
  {
    title: 'New Customers',
    value: '0',
    change: -100.00,
    changeLabel: 'VS. previous 28 days',
    icon: Users,
  },
  {
    title: 'Sales',
    value: '0',
    change: 0.00,
    changeLabel: 'VS. previous 28 days',
    icon: ShoppingCart,
  },
  {
    title: 'Return Customers',
    value: '0',
    change: 0.00,
    changeLabel: 'VS. previous 28 days',
    icon: UserCheck,
  },
  {
    title: 'Transaction Count',
    value: '0',
    change: 0.00,
    changeLabel: 'VS. previous 28 days',
    icon: ShoppingCart,
  },
]

const periodOptions = [
  { value: 'today', label: 'Today' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '28d', label: 'Last 28 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: '365d', label: 'Last 365 Days' },
  { value: 'all', label: 'All Time' },
]

export default function DashboardPage() {
  const [showAlert, setShowAlert] = React.useState(true)
  const [selectedPeriod, setSelectedPeriod] = React.useState('28d')

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end">
        <div className="relative">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="appearance-none rounded-md border border-gray-300 pl-3 pr-8 py-1.5 text-sm bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>

      {showAlert && (
        <div className="relative bg-sky-50 rounded-lg p-4">
          <button 
            onClick={() => setShowAlert(false)}
            className="absolute right-4 top-4 text-sky-400 hover:text-sky-500"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="text-sky-800">
            Your dashboard highlights the past 3 months for streamlined, actionable insights.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  )
}
