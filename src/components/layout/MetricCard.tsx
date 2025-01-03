'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change: number
  icon: LucideIcon
}

export function MetricCard({ title, value, change, icon: Icon }: MetricCardProps) {
  const isPositive = change >= 0

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
      <div className="mt-2 flex items-center">
        <span
          className={cn(
            'text-sm font-medium',
            isPositive ? 'text-green-600' : 'text-red-600'
          )}
        >
          {isPositive ? '+' : ''}{change}%
        </span>
        <span className="ml-2 text-sm text-gray-500">vs last period</span>
      </div>
    </div>
  )
} 