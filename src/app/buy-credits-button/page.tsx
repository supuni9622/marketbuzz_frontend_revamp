'use client'

import React from 'react'
import { CheckoutLayout } from '@/components/layout/CheckoutLayout'
import { CreditCard, Check } from 'lucide-react'

const creditPackages = [
  { id: 1, credits: 1000, price: 49, popular: false },
  { id: 2, credits: 5000, price: 199, popular: true },
  { id: 3, credits: 10000, price: 349, popular: false },
]

export default function BuyCreditsPage() {
  const [selectedPackage, setSelectedPackage] = React.useState(2)

  return (
    <CheckoutLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Buy Credits</h1>
          <p className="mt-1 text-sm text-gray-500">Choose a credit package that suits your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {creditPackages.map(({ id, credits, price, popular }) => (
            <div
              key={id}
              className={`relative rounded-lg border p-6 ${
                selectedPackage === id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {popular && (
                <span className="absolute -top-2 right-4 inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                  Popular
                </span>
              )}
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{credits.toLocaleString()} Credits</h3>
                  <p className="mt-1 text-sm text-gray-500">${price} USD</p>
                </div>
                <button
                  onClick={() => setSelectedPackage(id)}
                  className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    selectedPackage === id
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedPackage === id && <Check className="h-3 w-3" />}
                </button>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-500">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  No expiration
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Unused credits roll over
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Priority support
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="1234 5678 9012 3456"
                />
                <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
        </div>

        <button className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-500">
          Complete Purchase
        </button>
      </div>
    </CheckoutLayout>
  )
} 