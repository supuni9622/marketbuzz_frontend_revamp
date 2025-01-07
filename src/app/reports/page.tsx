'use client'

import React from 'react'
import { Download, Calendar } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end items-center gap-4">
        <button className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          <Calendar className="mr-2 h-4 w-4" />
          Last 30 Days
        </button>
        <button className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500">
          <Download className="mr-2 h-4 w-4" />
          Export
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Overview</h3>
          <div className="h-80 flex items-center justify-center border-t border-gray-200">
            {/* Chart component will be added here */}
            <p className="text-gray-500">Revenue chart placeholder</p>
          </div>
        </div>

        {/* Customer Growth Chart */}
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Growth</h3>
          <div className="h-80 flex items-center justify-center border-t border-gray-200">
            {/* Chart component will be added here */}
            <p className="text-gray-500">Customer growth chart placeholder</p>
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Performance</h3>
          <div className="h-80 flex items-center justify-center border-t border-gray-200">
            {/* Chart component will be added here */}
            <p className="text-gray-500">Campaign performance chart placeholder</p>
          </div>
        </div>

        {/* Sales by Category */}
        <div className="rounded-lg border bg-white p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
          <div className="h-80 flex items-center justify-center border-t border-gray-200">
            {/* Chart component will be added here */}
            <p className="text-gray-500">Sales by category chart placeholder</p>
          </div>
        </div>
      </div>
    </div>
  )
} 