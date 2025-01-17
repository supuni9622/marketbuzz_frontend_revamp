import { create } from 'zustand';
import {
  TWebsocketSyncDataResponse,
  TOrganizationModelJSON
} from "@shoutout-labs/market_buzz_crm_types";

interface OrganizationStore {
   credits: number;
  setCredits: (credits: number) => void;
  dollarValue: number;
  setDollarValue: (dollarValue: number) => void;
  organization: TOrganizationModelJSON;
  setOrganization: (organization: TOrganizationModelJSON) => void;
  syncDataResponse: TWebsocketSyncDataResponse;
  setSyncDataResponse: (syncDataResponse: TWebsocketSyncDataResponse) => void;
}

export const useOrganizationStore = create<OrganizationStore>((set) => ({
  credits: 0,
  setCredits: (credits: number) => set({ credits }),
  dollarValue: 0,
  setDollarValue: (dollarValue: number) => set({ dollarValue }),
  organization: {} as TOrganizationModelJSON,
  setOrganization: (organization: TOrganizationModelJSON) =>
    set(() => ({
      organization
    })),
  syncDataResponse: { customer: 0, orders: 0 } as TWebsocketSyncDataResponse,
  setSyncDataResponse: (syncDataResponse: TWebsocketSyncDataResponse) =>
    set(() => ({
      syncDataResponse
    }))
}));