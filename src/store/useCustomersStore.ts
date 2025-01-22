import { create } from 'zustand'

interface CustomersStore {
  totalCustomers: number
  setTotalCustomers: (count: number) => void
}

export const useCustomersStore = create<CustomersStore>((set) => ({
  totalCustomers: 0,
  setTotalCustomers: (count) => set({ totalCustomers: count })
})) 