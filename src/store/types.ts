import { TOrganizationModelJSON, TWebsocketSyncDataResponse } from '@shoutout-labs/market_buzz_crm_types'
import { UserRole } from '@/constants'

export interface AuthStore {
  user: {
    name: string;
  };
  setUser: (user: object) => void;
  token: string;
  role: UserRole;
  organizationId: string;
  initCompleted: boolean;
  setToken: (token: string) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
}

export interface OrganizationStore {
  credits: number;
  setCredits: (credits: number) => void;
  dollarValue: number;
  setDollarValue: (dollarValue: number) => void;
  organization: TOrganizationModelJSON;
  setOrganization: (organization: TOrganizationModelJSON) => void;
  syncDataResponse: TWebsocketSyncDataResponse;
  setSyncDataResponse: (syncDataResponse: TWebsocketSyncDataResponse) => void;
} 