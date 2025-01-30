import { fetchGet, jsonToQueryParam, fetchPost } from "./CommonServiceUtils";
import { Constants } from "@/constants";
import {
  SearchCustomerQueryWithSkipLimit,
  FilterCustomerQueryWithSkipLimit,
  FilterCustomerQuery,
  SearchCustomerQuery,
  CustomerFilterBaseQuery,
  CustomerFilterBaseQueryWithSkipLimit
} from "@/contexts/CustomerDataContext";

const getCustomers = (
  queryObj: CustomerFilterBaseQueryWithSkipLimit
): Promise<any> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}customers?${jsonToQueryParam(queryObj)}`
  );
};

const searchCustomers = (
  queryObj: SearchCustomerQueryWithSkipLimit
): Promise<any> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}customers/search?${jsonToQueryParam(queryObj)}`
  );
};

const getCustomersSearchCount = (
  queryObj: SearchCustomerQuery
): Promise<any> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}customers/search/count?${jsonToQueryParam(queryObj)}`
  );
};

const filterCustomers = (
  payload: FilterCustomerQueryWithSkipLimit
): Promise<any> => {
  return fetchPost(
    `${Constants.REACT_APP_API_BASE_URL}customers/filter`,
    payload
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

const updateCustomerDetails = (
  queryObj: string,
  payload: object
): Promise<any> => {
  return fetchPost(
    `${Constants.REACT_APP_API_BASE_URL}customers/${queryObj}/update`,
    payload
  );
};

const getSegments = (queryObj: object): Promise<any> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}segments?${jsonToQueryParam(queryObj)}`
  );
};

const createSegments = (payload: object): Promise<any> => {
  return fetchPost(`${Constants.REACT_APP_API_BASE_URL}segments`, payload);
};

export {
  getCustomers,
  searchCustomers,
  getCustomersSearchCount,
  getCustomersCount,
  filterCustomers,
  filterCustomersCount,
  getSegments,
  createSegments,
  updateCustomerDetails
};
