import { fetchGet, jsonToQueryParam , fetchPost} from "./CommonServiceUtils";
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

interface FilterCustomerQuery {
  filterObj: object;
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

const getSegments = (queryObj: object): Promise<any> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}segments?${jsonToQueryParam(queryObj)}`
  );
};

const filterCustomersCount = (payload: FilterCustomerQuery): Promise<any> => {
  return fetchPost(
    `${Constants.REACT_APP_API_BASE_URL}customers/filter/count`,
    payload
  );
};

const getCustomersCount = (queryObj: CustomerFilterBaseQuery): Promise<any> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}customers/count?${jsonToQueryParam(queryObj)}`
  );
};

export const CustomerService = {
  getCustomers,
  getSegments,
  filterCustomersCount,
  getCustomersCount
}; 