'use client'

import React from 'react'
import { TCustomerModelJSON } from '@shoutout-labs/market_buzz_crm_types'
import { Utility } from '@/utility/Utility'

interface CustomerTableProps {
  data: TCustomerModelJSON[]
}

export function CustomerTable({ data }: CustomerTableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">First Name</th>
            <th className="px-6 py-3">Last Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Phone Number</th>
            <th className="px-6 py-3">Avg. Spend</th>
            <th className="px-6 py-3">Visits</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {data?.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center">No customers found.</td>
            </tr>
          ) : (
            data?.map((customer) => (
              <tr 
                key={customer.id} 
                className="border-b hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4">{customer.firstName}</td>
                <td className="px-6 py-4">{customer.lastName}</td>
                <td className="px-6 py-4">{customer.email}</td>
                <td className="px-6 py-4">{customer.phoneNumber}</td>
                <td className="px-6 py-4">
                  ${Utility.getAvgSpend(
                    customer.totalTransactionsCount || 1,
                    customer.totalTransactionsSum || 0
                  ).toFixed(2)}
                </td>
                <td className="px-6 py-4">{customer.totalTransactionsCount || 0}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
} 