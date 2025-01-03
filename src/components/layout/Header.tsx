'use client'

import React from 'react'
import Image from 'next/image'
import { CreditCard, ChevronDown } from 'lucide-react'

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">10,262 Credits</span>
          <button className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500">
            Buy Credits
          </button>
        </div>
        <button className="flex items-center space-x-2">
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image
              src="https://picsum.photos/200"
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </header>
  )
} 