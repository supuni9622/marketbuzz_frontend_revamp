'use client'

import React from 'react'
import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  dataCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  perPageData: number
  setSkip: (skip: number) => void
  loadCustomerData: () => void
}

export function Pagination({
  dataCount,
  currentPage,
  setCurrentPage,
  perPageData,
  setSkip,
  loadCustomerData
}: PaginationProps) {
  const totalPages = Math.ceil(dataCount / perPageData)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSkip((page - 1) * perPageData)
    loadCustomerData()
  }

  if (totalPages <= 1) return null

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              isActive={currentPage === page}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  )
} 