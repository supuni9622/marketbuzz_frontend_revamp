import { fetchGet, jsonToQueryParam } from "./CommonServiceUtils";
import { Constants } from "@/constants";

export interface CustomerFilterSkipLimit {
  limit: number;
  skip: number;
}

export interface CustomerFilterBaseQuery {
  marketingAllowed?: boolean;
  isRequiredPhoneNumber?: boolean;
  hasTransactions?: boolean;
}

export type CustomerFilterBaseQueryWithSkipLimit = CustomerFilterBaseQuery & CustomerFilterSkipLimit;

export interface CustomerResponse {
  items: any[];
  count: number;
}

const getCustomers = (
  queryObj: CustomerFilterBaseQueryWithSkipLimit
): Promise<CustomerResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}customers?${jsonToQueryParam(queryObj)}`
  );
};

export const CustomerService = {
  getCustomers
}; 