import { create } from 'zustand'

interface Organization {
  referenceId: string
  appReferenceId: string
}

interface OrganizationStore {
  organization: Organization | null
  credits: number
  dollarValue: number
  setOrganization: (organization: Organization) => void
  setCredits: (credits: number) => void
  setDollarValue: (dollarValue: number) => void
}

export const useOrganizationStore = create<OrganizationStore>((set) => ({
  organization: null,
  credits: 0,
  dollarValue: 0,
  setOrganization: (organization) => set({ organization }),
  setCredits: (credits) => set({ credits }),
  setDollarValue: (dollarValue) => set({ dollarValue })
})) 