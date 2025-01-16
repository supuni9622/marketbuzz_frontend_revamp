import { fetchGet, fetchPost } from "./CommonServiceUtils";
import { Constants } from "@/constants";
import {
  TInvoiceGetResponse,
  TPackagePurchaseRequest,
  TPackagePurchaseResponse
} from "@shoutout-labs/market_buzz_crm_types";

const purchasePackage = (
  payload: TPackagePurchaseRequest
): Promise<TPackagePurchaseResponse> => {
  return fetchPost(
    `${Constants.REACT_APP_API_BASE_URL}billing/package-purchase`,
    payload
  );
};

const getInvoices = (): Promise<TInvoiceGetResponse> => {
  return fetchGet(`${Constants.REACT_APP_API_BASE_URL}billing/invoices`);
};

export { purchasePackage, getInvoices }; 