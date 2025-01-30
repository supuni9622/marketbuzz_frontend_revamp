'use client'

import React, { useState } from 'react'
import { TCustomerModelJSON } from '@shoutout-labs/market_buzz_crm_types'
import { Utility } from '@/utility/Utility'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useCustomersStore } from '@/store/useCustomersStore'
import { CustomerDetailsPanel } from './CustomerDetailsPanel'
import numeral from 'numeral'

interface CustomerTableProps {
  customersResults: TCustomerModelJSON[]
  customersCount: number
}

export function CustomerTable({ customersResults, customersCount }: CustomerTableProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<TCustomerModelJSON | null>(null)
  const [limit, skip, setSkip] = useCustomersStore((state) => [
    state.limit,
    state.skip,
    state.setSkip
  ])

  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(customersCount / limit)

  const getPageNumbers = () => {
    const pages = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 3) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }
    return pages
  }

  const handlePageChange = (page: number) => {
    setSkip((page - 1) * limit)
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Avg. Spend</TableHead>
              <TableHead>Visits</TableHead>
              <TableHead>Last Activity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customersResults.map((customer) => (
              <TableRow
                key={customer.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedCustomer(customer)}
              >
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell> ${" "}
                      {numeral(
                        Utility.getAvgSpend(
                          customer.totalTransactionsCount || 1,
                          customer.totalTransactionsSum || 0
                        )
                      ).format("0.00")}</TableCell>
                <TableCell>{customer.totalTransactionsCount || 0}</TableCell>
                <TableCell>{Utility.formatDate(customer.lastPurchasedDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>

          {getPageNumbers().map((page, index) => (
            <div key={index}>
              {page === 'ellipsis' ? (
                <span className="px-3">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? 'default' : 'outline'}
                  onClick={() => handlePageChange(Number(page))}
                >
                  {page}
                </Button>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Customer Details Panel */}
      {selectedCustomer && (
        <CustomerDetailsPanel
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}
    </>
  )
} 