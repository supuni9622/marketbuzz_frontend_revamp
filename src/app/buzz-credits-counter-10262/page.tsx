'use client'

import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'
import { CreditCard, AlertTriangle, ArrowDown, ArrowUp, Settings } from 'lucide-react'

const transactions = [
  {
    id: 1,
    type: 'debit',
    amount: -50,
    description: 'Campaign: Summer Sale 2024',
    date: '2024-02-20T10:00:00',
  },
  {
    id: 2,
    type: 'credit',
    amount: 5000,
    description: 'Credit Package Purchase',
    date: '2024-02-19T15:30:00',
  },
  {
    id: 3,
    type: 'debit',
    amount: -100,
    description: 'Campaign: Flash Sale',
    date: '2024-02-18T09:15:00',
  },
]

export default function CreditsPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Credits Balance</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Balance Card */}
          <div className="col-span-2 bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Current Balance</h2>
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold text-gray-900">10,262</span>
              <span className="text-sm text-gray-500">credits</span>
            </div>
            <div className="mt-4">
              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: '65%' }} />
              </div>
              <div className="flex items-center justify-between mt-2 text-sm">
                <span className="text-gray-500">Monthly Usage: 65%</span>
                <span className="text-gray-900 font-medium">6,670 / 10,262</span>
              </div>
            </div>
          </div>

          {/* Alert Card */}
          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Low Balance Alert</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Enable auto-reload to ensure uninterrupted service
                </p>
                <button className="mt-3 text-sm font-medium text-yellow-800 hover:text-yellow-900">
                  Configure Settings →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg border">
          <div className="border-b px-6 py-4">
            <h2 className="text-lg font-medium text-gray-900">Transaction History</h2>
          </div>
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {transaction.type === 'credit' ? (
                      <div className="rounded-full bg-green-100 p-2">
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-red-100 p-2">
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      transaction.type === 'credit'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'credit' ? '+' : ''}{transaction.amount} credits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg border">
          <div className="border-b px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Auto-Reload Settings</h2>
              <Settings className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                <span className="ml-2 text-sm text-gray-900">Enable auto-reload</span>
              </label>
              <p className="mt-1 text-sm text-gray-500">
                Automatically purchase credits when balance falls below threshold
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Threshold
              </label>
              <select className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>1,000 credits</option>
                <option>2,000 credits</option>
                <option>5,000 credits</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 