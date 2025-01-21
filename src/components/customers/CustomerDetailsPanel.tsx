'use client'

import { X, Mail, Phone, Calendar, User2, Clock, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TCustomerModelJSON, TTransactionModelJSON } from '@shoutout-labs/market_buzz_crm_types'
import { cn } from '@/lib/utils'
import moment from "moment"
import { Utility } from "@/utility/Utility"
import numeral from "numeral"
import { useState, useEffect, useCallback } from "react"
import { getTransactions, getTransactionCount } from '@/services/TransactionService'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CustomerDetailsPanelProps {
  customer: TCustomerModelJSON
  onClose: () => void
}

export function CustomerDetailsPanel({ customer, onClose }: CustomerDetailsPanelProps) {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [limit] = useState<number>(5)
  const [skip, setSkip] = useState<number>(0)
  const [transactions, setTransactions] = useState<TTransactionModelJSON[]>([])
  const [totalTransactions, setTotalTransactions] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const loadTransactionData = useCallback(async () => {
    if (!customer?.id) return
    
    try {
      setLoading(true)
      const queryObj = {
        query: customer.id
      }
      const getTransactionsQueryObj = {
        limit,
        skip,
        customerId: customer.id
      }
      const [transactionsRes, transactionCountRes] = await Promise.all([
        getTransactions(getTransactionsQueryObj),
        getTransactionCount(queryObj)
      ])
      setTransactions(transactionsRes.items)
      setTotalTransactions(transactionCountRes.count)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [customer?.id, limit, skip])

  useEffect(() => {
    loadTransactionData()
  }, [loadTransactionData])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    setSkip((newPage - 1) * limit)
  }

  const totalPages = Math.ceil(totalTransactions / limit)

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
      <div className="p-6 space-y-6 h-[calc(100vh-88px)] overflow-y-auto">
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
              <span>{customer?.dateOfBirth
                ? moment(customer?.dateOfBirth).format("LL")
                : "Not available"}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-gray-500" />
              <div>
                <div>Created On</div>
                <div className="text-sm text-gray-600">{moment(
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
            <div className="text-2xl font-semibold">${numeral(
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>${numeral(transaction.amount).format('0.00')}</TableCell>
                      <TableCell>{moment(transaction.transactionOn).format("LL LTS")}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {transactions.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Showing {transactions.length} of {totalTransactions} results
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 