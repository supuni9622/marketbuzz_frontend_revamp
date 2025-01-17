import { useEffect, ReactElement, useCallback } from "react";
import { useAuthStore, useOrganizationStore } from "../store";
import { getOragnizationData } from "../services";
import { PerCreditValue } from "@shoutout-labs/marketbuzz-constants";
import useWebSocketData from "../services/WebSocketUtil";
import { Constants } from "@/constants";
import GTMService from "../services/GTMService";

const OrganizationStoreProvider = ({
  children
}: {
  children: ReactElement;
}) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const organizationId = useAuthStore((state) => state.organizationId);
  const setCredits = useOrganizationStore((state) => state.setCredits);
  const setDollarValue = useOrganizationStore((state) => state.setDollarValue);
  const setOrganization = useOrganizationStore((state) => state.setOrganization);
  const setSyncDataResponse = useOrganizationStore((state) => state.setSyncDataResponse);

  const getOrganizationCredits = useCallback(async () => {
    try {
      const response = await getOragnizationData();
      if (response?.credits) {
        setCredits(response.credits);
        const dollarValue = response.credits * PerCreditValue;
        setDollarValue(dollarValue);
      }
      setOrganization(response);
      GTMService.userProfileUpdateEvent({
        organizationId: response.id,
        name: response.name,
        country: response.country,
        timeZone: response.timeZone,
        status: response.status,
        createdOn: response.createdOn,
        ...(response.features
          ? { featureList: response.features.toString() }
          : {}),
        ...(response.credits ? { credits: response.credits } : {}),
        address: response.address
          ? {
              address1: response.address.address1 || "",
              city: response.address.city || "",
              state: response.address.state || "",
              zip: response.address.zip || "",
              country: response.country || ""
            }
          : undefined,
        phoneNumber: response.phoneNumber || "",
        employeesCount: response.metadata?.employees?.length || 0,
        isBillable: response.metadata?.billingInfo?.planBillable || false,
        ownerDetails: response.owner
          ? {
              name: response.owner.name || "",
              email: response.owner.email || ""
            }
          : undefined
      });
    } catch (e) {
      console.error(e);
    }
  }, [setCredits, setDollarValue, setOrganization]);

  const { dataResponse } = useWebSocketData(
    `${Constants.WEBSOCKET_BASE_URL}?token=${useAuthStore.getState().token}`
  );

  useEffect(() => {
    if (dataResponse) {
      setSyncDataResponse(dataResponse);
    }
  }, [dataResponse, setSyncDataResponse]);

  useEffect(() => {
    if (isLoggedIn() && organizationId) {
      getOrganizationCredits();
    }
  }, [isLoggedIn, organizationId, getOrganizationCredits]);

  return children;
};

export default OrganizationStoreProvider;
