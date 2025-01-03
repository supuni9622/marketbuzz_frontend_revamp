'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { Search, Filter, ChevronDown } from 'lucide-react'

const customerSegments = [
  { name: 'All Customers', count: 9 },
  { name: 'Reachable Customers', count: 6 },
  { name: 'First Time Customers', count: 1 },
  { name: 'Inactive Customers', count: 1 },
]

const customers = [
  { firstName: 'anjali', lastName: 'apeksha', phone: '14185438090', avgSpend: 18.00, visits: 3 },
  { firstName: 'madura', lastName: 'pradeep', phone: '15875302271', avgSpend: 11.00, visits: 2 },
  { firstName: 'thamindu', lastName: '', phone: '94776448928', avgSpend: 10.00, visits: 1 },
  { firstName: 'Saduni', lastName: '', phone: '', avgSpend: 0.00, visits: 0 },
  { firstName: 'Supuni', lastName: 'Manamperi', email: 'supunimanamperi@gmail.com', avgSpend: 0.00, visits: 0 },
  { firstName: 'Suu', lastName: 'Manamperi', email: 'supunimanamperi@gmail.com', avgSpend: 0.00, visits: 0 },
  { firstName: 'Nipuni', lastName: 'Punsara', email: 'nipuni@gmail.com', phone: '14145438090', avgSpend: 0.00, visits: 0 },
]

export default function CustomersPage() {
  const [activeSegment, setActiveSegment] = React.useState('All Customers')

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">CUSTOMERS LIST</h1>
        </div>

        {/* Segments */}
        <div className="flex items-center space-x-4 overflow-x-auto">
          {customerSegments.map((segment) => (
            <button
              key={segment.name}
              onClick={() => setActiveSegment(segment.name)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm ${
                activeSegment === segment.name
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{segment.name}</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-xs">
                {segment.count}
              </span>
            </button>
          ))}
          <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm">
            <span>+ More Segments</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center justify-between">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button className="rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
            Filter Customers
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  First Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Spend
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visits
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {customers.map((customer, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.firstName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.email || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.phone || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${customer.avgSpend.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.visits}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MainLayout>
  )
} 