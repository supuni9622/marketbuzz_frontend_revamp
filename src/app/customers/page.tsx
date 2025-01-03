'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Search, Filter, Grid, List } from 'lucide-react'

export default function CustomersPage() {
  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:min-w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </button>
            <div className="flex rounded-md border border-gray-300 p-1">
              <button className="rounded p-1 hover:bg-gray-100">
                <Grid className="h-4 w-4 text-gray-400" />
              </button>
              <button className="rounded p-1 bg-gray-100">
                <List className="h-4 w-4 text-gray-900" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Table rows will be populated with customer data */}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  )
} 