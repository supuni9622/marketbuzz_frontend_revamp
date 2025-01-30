"use client";

import { createContext, useContext, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from '@/store/useAuthStore'
import { useCustomersStore } from "@/store/useCustomersStore";
import { TCustomerModelJSON } from "@shoutout-labs/market_buzz_crm_types";
import {
  filterCustomers,
  filterCustomersCount,
  getCustomers,
  getCustomersCount,
  getCustomersSearchCount,
  searchCustomers
} from "@/services";
import { CustomersFilterTasks } from "@/types/customers";

export interface CustomerFilterSkipLimit {
  limit: number;
  skip: number;
}

export interface CustomerFilterBaseQuery {
  marketingAllowed?: boolean;
  isRequiredPhoneNumber?: boolean;
  hasTransactions?: boolean;
}

export interface SearchCustomerQuery {
  query: string;
}

export interface FilterCustomerQuery {
  filterObj: object;
}

export type SearchCustomerQueryWithSkipLimit = SearchCustomerQuery &
  CustomerFilterSkipLimit;

export type FilterCustomerQueryWithSkipLimit = FilterCustomerQuery &
  CustomerFilterSkipLimit;
export type CustomerFilterBaseQueryWithSkipLimit = CustomerFilterBaseQuery &
  CustomerFilterSkipLimit;

export function useCustomers() {
 
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);
  const limit = useCustomersStore((state) => state.limit);
  const skip = useCustomersStore((state) => state.skip);
  const queryTask = useCustomersStore((state) => state.queryTask);

  const {
    data: customers,
    isLoading: isLoadingCustomers,
    refetch: refetchCustomersData,
    isFetching: isFetchingCustomersData
  } = useQuery<TCustomerModelJSON[], Error>({
    queryKey: ["customers", queryTask.task, queryTask.query, limit, skip], //@ts-ignore
    queryFn: async (): Promise<TCustomerModelJSON[]> => {
      switch (queryTask.task) {
        case CustomersFilterTasks.searchCustomers: {
          const customerResponse = await searchCustomers({
            ...(queryTask.query as SearchCustomerQuery),
            ...{ limit, skip }
          });

          return (customerResponse.items ?? []) as TCustomerModelJSON[];
        }
        case CustomersFilterTasks.filterCustomers: {
          const customerResponse = await filterCustomers({
            ...(queryTask.query as FilterCustomerQuery),
            ...{ limit, skip }
          });
          return (customerResponse.items ?? []) as TCustomerModelJSON[];
        }
        case CustomersFilterTasks.getAllCustomers:
        default: {
          const customerResponse = await getCustomers({ limit, skip });
          return (customerResponse.items ?? []) as TCustomerModelJSON[];
        }
      }
    },
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });
  return {
    customers,
    isLoadingCustomers,
    refetchCustomersData,
    isFetchingCustomersData
  };
}

export function useCustomersCount() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);
  const limit = useCustomersStore((state) => state.limit);
  const skip = useCustomersStore((state) => state.skip);
  const queryTask = useCustomersStore((state) => state.queryTask);

  const {
    data: customersCount,
    isLoading: isLoadingCustomersCount,
    refetch: refetchCustomersCount,
    isFetching: isFetchingCustomersCount
  } = useQuery<number, Error>({
    queryKey: ["customersCount", queryTask.task, queryTask.query, limit, skip], //@ts-ignore
    queryFn: async (): Promise<number> => {
      switch (queryTask.task) {
        case CustomersFilterTasks.searchCustomers: {
          const customerCountResponse = await getCustomersSearchCount(
            queryTask.query as SearchCustomerQuery
          );

          return customerCountResponse.count ?? 0;
        }
        case CustomersFilterTasks.filterCustomers: {
          const customerCountResponse = await filterCustomersCount(
            queryTask.query as FilterCustomerQuery
          );
          return customerCountResponse.count ?? 0;
        }

        case CustomersFilterTasks.getAllCustomers:
        default: {
          const response = await getCustomersCount(
            queryTask.query as CustomerFilterBaseQuery
          );
          return response.count ?? 0;
        }
      }
    },
    enabled: isLoggedIn() && initCompleted,
    refetchOnWindowFocus: false
  });

  return {
    customersCount,
    isLoadingCustomersCount,
    refetchCustomersCount,
    isFetchingCustomersCount
  };
}
