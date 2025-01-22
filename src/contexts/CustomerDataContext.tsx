'use client'

import React, { createContext, useContext, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCustomers, getCustomersCount } from '@/services'
import { TCustomerModelJSON, TCustomerFilterRequest, TCustomerFilterCountRequest } from '@shoutout-labs/market_buzz_crm_types'

interface CustomerDataContextType {
  customers: TCustomerModelJSON[]
  isLoadingCustomers: boolean
  isFetchingCustomersData: boolean
  refetchCustomersData: () => Promise<any>
  customersCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  filterQuery: Record<string, any> | null
  setFilterQuery: (filter: Record<string, any> | null) => void
}

const CustomerDataContext = createContext<CustomerDataContextType | undefined>(undefined)

export function CustomerDataProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterQuery, setFilterQuery] = useState<Record<string, any> | null>(null)

  const limit = 10
  const skip = (currentPage - 1) * limit

  // Build filter object
  const buildFilterObj = () => {
    let filterObj: Record<string, any> = {}
    
    if (searchQuery) {
      filterObj = {
        $or: [
          { firstName: { $regex: searchQuery, $options: 'i' } },
          { lastName: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { phoneNumber: { $regex: searchQuery, $options: 'i' } }
        ]
      }
    }

    if (filterQuery) {
      filterObj = { ...filterObj, ...filterQuery }
    }

    return filterObj
  }

  const { data: customersData, isLoading: isLoadingCustomers, isFetching: isFetchingCustomersData, refetch: refetchCustomersData } = useQuery({
    queryKey: ['customers', currentPage, searchQuery, filterQuery],
    queryFn: async () => {
      const request = {
        limit,
        skip,
        filterObj: buildFilterObj()
      } satisfies TCustomerFilterRequest
      const response = await getCustomers(request)
      return response
    }
  })

  const { data: countData } = useQuery({
    queryKey: ['customers-count', searchQuery, filterQuery],
    queryFn: async () => {
      const request = {
        marketingAllowed: filterQuery?.marketingAllowed,
        isRequiredPhoneNumber: filterQuery?.isRequiredPhoneNumber,
        hasTransactions: filterQuery?.hasTransactions
      }
      const response = await getCustomersCount(request)
      return response
    }
  })

  const value = {
    customers: customersData?.items || [],
    isLoadingCustomers,
    isFetchingCustomersData,
    refetchCustomersData,
    customersCount: countData?.count || 0,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    filterQuery,
    setFilterQuery
  }

  return (
    <CustomerDataContext.Provider value={value}>
      {children}
    </CustomerDataContext.Provider>
  )
}

export function useCustomerData() {
  const context = useContext(CustomerDataContext)
  if (context === undefined) {
    throw new Error('useCustomerData must be used within a CustomerDataProvider')
  }
  return context
} 