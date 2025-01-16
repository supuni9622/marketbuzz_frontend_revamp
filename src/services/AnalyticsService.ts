import { fetchGet, jsonToQueryParam } from "./CommonServiceUtils";
import { Constants } from "@/constants";
import {
  TTransactionCountReportRequest,
  TTransactionCountReportResponse,
  TNewCustomerCountReportRequest,
  TNewCustomerCountReportResponse,
  TRepeatCustomerCountReportRequest,
  TRepeatCustomerCountReportResponse,
  TSalesSumRequest,
  TSalesSumResponse,
  TTransactionReportRequest,
  TTransactionReportResponse,
  TCustomerReportRequest,
  TCustomerReportResponse,
  TVisitFrequencyRequest,
  TVisitFrequencyResponse
} from "@shoutout-labs/market_buzz_crm_types";

const getTransactionCountAnalytics = (
  queryObj: TTransactionCountReportRequest
): Promise<TTransactionCountReportResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/transaction/count?${jsonToQueryParam(queryObj)}`
  );
};

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

const getSalesSumAnalytics = (
  queryObj: TSalesSumRequest
): Promise<TSalesSumResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/sale/sum?${jsonToQueryParam(queryObj)}`
  );
};

const getTotalSalesSumAnalytics = (): Promise<TSalesSumResponse> => {
  return fetchGet(`${Constants.REACT_APP_API_BASE_URL}analytics/sale/sum`);
};

const getTotalTransactionCountAnalytics = (): Promise<TTransactionCountReportResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/transaction/count`
  );
};

const getTotalRepeatCustomerCountAnalytics = (): Promise<TRepeatCustomerCountReportResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/repeatCustomer/count`
  );
};

const getSalesDateBucketAnalytics = (
  queryObj: TTransactionReportRequest
): Promise<TTransactionReportResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}analytics/transactions?${jsonToQueryParam(queryObj)}`
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

export interface Invoice {
  id: string
  purchaseDate: string
  credits: number
  cost: number
}

export const getInvoices = async (): Promise<Invoice[]> => {
  const response = await fetch('/api/analytics/invoices')
  if (!response.ok) {
    throw new Error('Failed to fetch invoices')
  }
  return response.json()
}

export const AnalyticsService = {
  getTransactionCountAnalytics,
  getNewCustomerCountAnalytics,
  getRepeatCustomerCountAnalytics,
  getSalesSumAnalytics,
  getTotalTransactionCountAnalytics,
  getTotalSalesSumAnalytics,
  getTotalRepeatCustomerCountAnalytics,
  getSalesDateBucketAnalytics,
  getCustomersDateBucketAnalytics,
  getRepeatCustomersDateBucketAnalytics,
  getVisitFrequencyAnalytics,
  getInvoices
}; 