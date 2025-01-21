'use client'

import { X, Mail, Phone, Calendar, User2, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { TCustomerModelJSON } from '@shoutout-labs/market_buzz_crm_types'
import { cn } from '@/lib/utils';
import moment from "moment";
import { Utility } from "@/utility/Utility";
import numeral from "numeral";

interface CustomerDetailsPanelProps {
  customer: TCustomerModelJSON
  onClose: () => void
}

interface TransactionType {
  id: string
  amount: number
  date: string
}

export function CustomerDetailsPanel({ customer, onClose }: CustomerDetailsPanelProps) {
  // Mock transactions data - replace with actual data
  const transactions: TransactionType[] = [
    {
      id: '66f50d5d917991f9e31be20b',
      amount: 24,
      date: '2024-09-26T12:59:31'
    },
    {
      id: '66f50159917991f9e30f7d1f',
      amount: 10,
      date: '2024-09-26T12:08:15'
    },
    {
      id: '66f285b3917991f9e30ad9d0',
      amount: 20,
      date: '2024-09-24T14:53:27'
    }
  ]

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-white shadow-lg border-l transform transition-transform duration-200 ease-in-out">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-medium">
              {customer.firstName?.[0]}{customer.lastName?.[0]}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {customer.firstName} {customer.lastName}
            </h2>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{customer.email || '-'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gray-500" />
              <span>{customer.phoneNumber || '-'}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span> {customer?.dateOfBirth
                    ? moment(customer?.dateOfBirth).format("LL")
                    : "Not available"}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <div>Created On</div>
                <div className="text-sm text-gray-600"> {moment(
                    customer?.customerCreatedOn ||
                      customer?.createdOn
                  ).format("LL")}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <div>Last Activity On</div>
                <div className="text-sm text-gray-600">{moment(customer?.lastPurchasedDate).format("LL")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Permission */}
        <div>
          <h3 className="text-sm font-medium mb-2">Marketing Permission</h3>
          <span className={cn(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
            customer.optIn.marketing.allowed
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          )}>
            {customer.optIn.marketing.allowed ? 'Allowed' : 'Denied'}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-600">Visits</div>
            <div className="text-2xl font-semibold">{customer?.totalTransactionsCount}</div>
          </div>
          <div>
            <div className="text-sm text-gray-600">Avg. Spend</div>
            <div className="text-2xl font-semibold"> ${numeral(
                        Utility.getAvgSpend(
                          customer.totalTransactionsCount || 1,
                          customer.totalTransactionsSum || 0
                        )
                      ).format("0.00")}</div>
          </div>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-sm font-medium mb-4">Transactions</h3>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="space-y-1">
                  <p className="text-sm font-medium">${transaction.amount}</p>
                  <p className="text-xs text-gray-500">
                    {format(new Date(transaction.date), 'MMM dd, yyyy hh:mm:ss a')}
                  </p>
                </div>
                <div className="text-xs text-gray-500">
                  {transaction.id}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 