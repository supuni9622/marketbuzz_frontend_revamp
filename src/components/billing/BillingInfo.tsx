'use client'

import { Mail } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useOrganizationStore } from '@/store/useOrganizationStore'

export function BillingInfo() {
  const { credits, dollarValue } = useOrganizationStore()

  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-10">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-medium">Available Buzz Credits</h3>
              <span className="text-2xl font-semibold">{credits}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xl font-semibold">${parseFloat(dollarValue.toFixed(2))}</span>
              <span className="text-gray-600">worth credits</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-gray-500" />
              <span className="text-gray-600">1 credit per SMS</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 