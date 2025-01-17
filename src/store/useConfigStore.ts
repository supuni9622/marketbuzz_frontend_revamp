import { create } from 'zustand';
import {
  TCloverAppsSchemaWithoutAppSecret
} from "@shoutout-labs/market_buzz_crm_types";

enum Features {
  ANALYTICS = 'ANALYTICS',
  CRM = 'CRM'
}

const defaultCloverAppConfig: TCloverAppsSchemaWithoutAppSecret = {
  features: [Features.CRM, Features.ANALYTICS],
  hasSubscriptionPackages: false,
  legacySubscriptionJobEnabled: false,
  appName: "Market Buzz",
  logo: "",
  primaryColor: "#128f8b",
  primaryHoverColor: "#0f7a76",
  secondaryColor: "#878a99",
  packages: []
};

interface ConfigStore  {
  config: TCloverAppsSchemaWithoutAppSecret;
  setConfig: (config: TCloverAppsSchemaWithoutAppSecret) => void;
  isLoadingConfigData: boolean;
  setIsLoadingConfigData: (isLoadingConfigData: boolean) => void;
};

export const useConfigStore = create<ConfigStore>((set) => ({
  config: defaultCloverAppConfig,
  setConfig: (config: TCloverAppsSchemaWithoutAppSecret) =>
    set(() => ({
      config
    })),
  isLoadingConfigData: false,
  setIsLoadingConfigData: (isLoadingConfigData: boolean) =>
    set(() => ({
      isLoadingConfigData
    }))
}));