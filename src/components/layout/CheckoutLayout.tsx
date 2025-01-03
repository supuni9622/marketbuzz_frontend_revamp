'use client'

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Link>
            <div className="text-sm font-medium text-gray-600">
              Secure Checkout
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-3xl px-4 py-8">
        {children}
      </main>
    </div>
  )
} 