import { create } from 'zustand';
import { TCustomerModelJSON } from "@shoutout-labs/market_buzz_crm_types";
import { CustomersFilterTasks } from "@/types/customers";
import {
  CustomerFilterBaseQuery,
  SearchCustomerQuery,
  FilterCustomerQuery
} from "../contexts/CustomerDataContext";

export interface CustomerQueryTask {
  task: CustomersFilterTasks;
  query: CustomerFilterBaseQuery | SearchCustomerQuery | FilterCustomerQuery;
}

export interface CustomersStore {
  totalCustomers: number;
  setTotalCustomers: (totalCustomers: number) => void;
  customerList: TCustomerModelJSON[];
  setCustomerList: (customerList: TCustomerModelJSON[]) => void;
  selectedCustomer: TCustomerModelJSON | null;
  setSelectedCustomer: (selectedCustomer: TCustomerModelJSON) => void;
  segments: any[];
  setSegments: (segments: any[]) => void;
  limit: number;
  setLimit: (limit: number) => void;
  skip: number;
  setSkip: (skip: number) => void;
  queryTask: CustomerQueryTask;
  setQueryTask: (queryTask: CustomerQueryTask) => void;
}

export const useCustomersStore = create<CustomersStore>((set) => ({
  totalCustomers: 0,
  setTotalCustomers: (totalCustomers) => set({ totalCustomers }),
  customerList: [],
  setCustomerList: (customerList) => set({ customerList }),
  selectedCustomer: null,
  setSelectedCustomer: (selectedCustomer) => set({ selectedCustomer }),
  segments: [],
  setSegments: (segments) => set({ segments }),
  limit: 10,
  setLimit: (limit) => set({ limit }),
  skip: 0,
  setSkip: (skip) => set({ skip }),
  queryTask: {
    task: CustomersFilterTasks.getAllCustomers,
    query: {}
  },
  setQueryTask: (queryTask) => set({ queryTask })
}));