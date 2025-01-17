import { useEffect, ReactElement } from "react";
import { useAuthStore, useConfigStore, useOrganizationStore } from "../store";
import { getConfigurationData } from "../services";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "@/components/common/Loader";

const ConfigStoreProvider = ({ children }: { children: ReactElement }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const initCompleted = useAuthStore((state) => state.initCompleted);
  const setConfig = useConfigStore((state) => state.setConfig);
  const setIsLoadingConfigData = useConfigStore((state) => state.setIsLoadingConfigData);
  const organization = useOrganizationStore((state) => state.organization);

  const loggedIn = isLoggedIn();
  const { data, isLoading } = useQuery({
    queryKey: ["config"],
    queryFn: getConfigurationData,
    enabled: loggedIn && initCompleted,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });

  useEffect(() => {
    setIsLoadingConfigData(isLoading);
    
    if (data?.clover?.apps && organization.appReferenceId) {
      const appConfig = data.clover.apps[organization.appReferenceId];
      if (appConfig) {
        setConfig(appConfig);
      }
    }
  }, [data, isLoading, organization.appReferenceId]);

  if (isLoading) {
    return <Loader />;
  }

  return children;
};

export default ConfigStoreProvider;

