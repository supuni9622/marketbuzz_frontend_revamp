'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuthStore } from '@/store/useAuthStore'
import { getInvoices } from '@/services/BillingService'
import { Loader } from '@/components/common/Loader'
import type { TInvoiceModelJSON } from '@shoutout-labs/market_buzz_crm_types'

export function InvoiceList() {
  const [invoices, setInvoices] = useState<TInvoiceModelJSON[]>([])
  const [loading, setLoading] = useState(false)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  const loadInvoiceData = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getInvoices()
      setInvoices(response.items)
    } catch (error) {
      console.error('Error loading invoices:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn()) {
      loadInvoiceData()
    }
  }, [isLoggedIn, loadInvoiceData])

  if (loading) {
    return <Loader />
  }

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-medium mb-6">SMS Package Purchase History</h3>
        <Table>
          <TableHeader className="bg-[#F8F9FC]">
            <TableRow>
              <TableHead className="text-blue-900">Invoice ID</TableHead>
              <TableHead className="text-blue-900">Purchase Date</TableHead>
              <TableHead className="text-blue-900">Buzz Credits</TableHead>
              <TableHead className="text-blue-900 text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <TableRow key={invoice.referenceId}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{new Date(invoice.createdOn).toLocaleDateString()}</TableCell>
                  <TableCell>{invoice.credits}</TableCell>
                  <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
} 