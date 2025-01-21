'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { TCustomerModelJSON } from '@shoutout-labs/market_buzz_crm_types'
import { CustomerService } from '@/services/CustomerService'

export enum CustomersFilterTasks {
  FETCH_CUSTOMERS = 'FETCH_CUSTOMERS',
  FETCH_CUSTOMER_COUNT = 'FETCH_CUSTOMER_COUNT',
}

interface CustomerDataContextType {
  customers: TCustomerModelJSON[]
  isLoadingCustomers: boolean
  isFetchingCustomersData: boolean
  customersCount: number
  refetchCustomersData: () => Promise<void>
}

const CustomerDataContext = createContext<CustomerDataContextType | undefined>(undefined)

interface CustomerDataProviderProps {
  children: ReactNode
}

export function CustomerDataProvider({ children }: CustomerDataProviderProps) {
  const {
    data: customers = [],
    isLoading: isLoadingCustomers,
    isFetching: isFetchingCustomersData,
    refetch: refetchCustomers
  } = useQuery({
    queryKey: [CustomersFilterTasks.FETCH_CUSTOMERS],
    queryFn: async () => {
      const response = await CustomerService.getCustomers({
        limit: 10,
        skip: 0
      })
      return response.items
    }
  })

  const { data: customersCount = 0 } = useQuery({
    queryKey: [CustomersFilterTasks.FETCH_CUSTOMER_COUNT],
    queryFn: async () => {
      const response = await CustomerService.getCustomersCount({})
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
        refetchCustomersData
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