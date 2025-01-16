import { fetchGet, jsonToQueryParam } from "./CommonServiceUtils";
import { Constants } from "@/constants";
import type {
  TTransactionCountReportRequest,
  TTransactionCountReportResponse,
  TNewCustomerCountReportRequest,
  TNewCustomerCountReportResponse,
  TRepeatCustomerCountReportRequest,
  TRepeatCustomerCountReportResponse,
  TCustomerReportRequest,
  TCustomerReportResponse,
  TVisitFrequencyRequest,
  TVisitFrequencyResponse
} from "@shoutout-labs/market_buzz_crm_types";

const getNewCustomerCountAnalytics = (
  queryObj: TNewCustomerCountReportRequest
): Promise<TNewCustomerCountReportResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/newCustomer/count?${jsonToQueryParam(queryObj)}`
  );
};

const getRepeatCustomerCountAnalytics = (
  queryObj: TRepeatCustomerCountReportRequest
): Promise<TRepeatCustomerCountReportResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/repeatCustomer/count?${jsonToQueryParam(queryObj)}`
  );
};

const getCustomersDateBucketAnalytics = (
  queryObj: TCustomerReportRequest
): Promise<TCustomerReportResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/customers?${jsonToQueryParam(queryObj)}`
  );
};

const getRepeatCustomersDateBucketAnalytics = (
  queryObj: TCustomerReportRequest
): Promise<TCustomerReportResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/repeatCustomers?${jsonToQueryParam(queryObj)}`
  );
};

const getVisitFrequencyAnalytics = (
  queryObj: TVisitFrequencyRequest
): Promise<TVisitFrequencyResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/visitFrequency?${jsonToQueryParam(queryObj)}`
  );
};

export const AnalyticsService = {
  getNewCustomerCountAnalytics,
  getRepeatCustomerCountAnalytics,
  getCustomersDateBucketAnalytics,
  getRepeatCustomersDateBucketAnalytics,
  getVisitFrequencyAnalytics
}; 