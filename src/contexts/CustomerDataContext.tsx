'use client'

import { createContext, useContext, ReactNode, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TCustomerModelJSON } from '@shoutout-labs/market_buzz_crm_types'
import { searchCustomers, filterCustomers, getCustomers, filterCustomersCount, getCustomersCount } from '@/services'

export enum CustomersFilterTasks {
  FETCH_CUSTOMERS = 'FETCH_CUSTOMERS',
  FETCH_CUSTOMER_COUNT = 'FETCH_CUSTOMER_COUNT',
}

interface CustomerDataContextType {
  customers: TCustomerModelJSON[]
  isLoadingCustomers: boolean
  isFetchingCustomersData: boolean
  customersCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  refetchCustomersData: () => Promise<void>
  searchQuery: string
  setSearchQuery: (query: string) => void
  filterQuery: any
  setFilterQuery: (filter: any) => void
}

const CustomerDataContext = createContext<CustomerDataContextType | undefined>(undefined)

interface CustomerDataProviderProps {
  children: ReactNode
}

export function CustomerDataProvider({ children }: CustomerDataProviderProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterQuery, setFilterQuery] = useState<any>(null)
  const limit = 10
  const skip = (currentPage - 1) * limit

  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    isFetching: isFetchingCustomersData,
    refetch: refetchCustomers
  } = useQuery({
    queryKey: [CustomersFilterTasks.FETCH_CUSTOMERS, currentPage, searchQuery, filterQuery],
    queryFn: async () => {
      if (searchQuery) {
        const response = await searchCustomers({
          query: searchQuery,
          limit,
          skip
        })
        return response.items
      }
      
      if (filterQuery) {
        const response = await filterCustomers({
          filterObj: filterQuery,
          limit,
          skip
        })
        return response.items
      }

      const response = await getCustomers({
        limit,
        skip
      })
      return response.items
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    retryDelay: 1000,
    enabled: !searchQuery || searchQuery.length >= 2,
    placeholderData: (previousData) => previousData,
  })

  const { data: customersCount = 0 } = useQuery({
    queryKey: [CustomersFilterTasks.FETCH_CUSTOMER_COUNT, searchQuery, filterQuery],
    queryFn: async () => {
      if (filterQuery) {
        const response = await filterCustomersCount({
          filterObj: filterQuery
        })
        return response.count
      }

      const response = await getCustomersCount({})
      return response.count
    }
  })

  const refetchCustomersData = async () => {
    await refetchCustomers()
  }

  return (
    <CustomerDataContext.Provider
      value={{
        customers,
        isLoadingCustomers,
        isFetchingCustomersData,
        customersCount,
        currentPage,
        setCurrentPage,
        refetchCustomersData,
        searchQuery,
        setSearchQuery,
        filterQuery,
        setFilterQuery
      }}
    >
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