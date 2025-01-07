'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: LucideIcon
}

export function MetricCard({ title, value, change, changeLabel, icon: Icon }: MetricCardProps) {
  const isPositive = change >= 0
  const changeColor = change === 0 ? 'text-blue-600' : isPositive ? 'text-green-600' : 'text-red-600'

  return (
    <div className="rounded-lg border bg-white p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-medium text-gray-700">{title}</h3>
        <Icon className="h-6 w-6 text-blue-500" />
      </div>
      <p className="mt-4 text-3xl font-semibold text-gray-900">{value}</p>
      <div className="mt-2">
        <span className={cn('text-sm font-medium', changeColor)}>
          {change > 0 && '+'}{change.toFixed(2)}%
        </span>
        <span className="ml-2 text-sm text-gray-500">{changeLabel}</span>
      </div>
    </div>
  )
} 