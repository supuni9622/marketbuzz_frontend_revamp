import { fetchGet } from "./CommonServiceUtils";
import { Constants } from "@/constants";
import { TConfigGetResponse } from "@shoutout-labs/market_buzz_crm_types";

const getConfigurationData = (): Promise<TConfigGetResponse> => {
  return fetchGet(`${Constants.REACT_APP_API_BASE_URL}config`);
};

export { getConfigurationData };