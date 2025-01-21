import { fetchGet, jsonToQueryParam } from "./CommonServiceUtils";
import { Constants } from "@/constants";
import {
  TTransactionGetRequest,
  TTransactionGetResponse,
  TTransactionCountRequest
} from "@shoutout-labs/market_buzz_crm_types";

const getTransactions = (
  queryObj: TTransactionGetRequest
): Promise<TTransactionGetResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}transaction?${jsonToQueryParam(queryObj)}`
  );
};

const getTransactionCount = (
  queryObj: TTransactionCountRequest
): Promise<any> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}transaction/count?${jsonToQueryParam(queryObj)}`
  );
};

export { getTransactions, getTransactionCount };
