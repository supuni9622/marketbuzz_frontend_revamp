'use client'

import React from 'react'
import { BillingInfo } from '../../components/billing/BillingInfo'
import { BillingPackages } from '../../components/billing/BillingPackages'
import { InvoiceList } from '../../components/billing/InvoiceList'

export default function BillingPage() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Buzz Credits</h2>
      <BillingInfo />
      <BillingPackages />
      <InvoiceList />
    </div>
  )
} 