import { fetchGet, fetchPut, jsonToQueryParam } from "./CommonServiceUtils";
import { Constants } from "@/constants";
import {
  TOrganizationGetResponse,
  TOrganizationListGetResponse,
  TOrganizationSearchResponse,
  TOrganizationUpdateRequest,
  TOrganizationUpdateResponse
} from "@shoutout-labs/market_buzz_crm_types";

const getOragnizationData = (): Promise<TOrganizationGetResponse> => {
  return fetchGet(`${Constants.REACT_APP_API_BASE_URL}organizations`);
};

const updateOrganizationName = async (
  payload: TOrganizationUpdateRequest
): Promise<TOrganizationUpdateResponse> => {
  return await fetchPut(
    `${Constants.REACT_APP_API_BASE_URL}organizations`,
    payload
  );
};

const getOragnizations = (): Promise<TOrganizationListGetResponse> => {
  return fetchGet(`${Constants.REACT_APP_API_BASE_URL}organizations/list`);
};

const searchOragnizations = (
  queryObj: object
): Promise<TOrganizationSearchResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}organizations/searchOrganization?${jsonToQueryParam(queryObj)}`
  );
};

const filterOragnizations = (
  queryObj: object
): Promise<TOrganizationSearchResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}organizations/filter?${jsonToQueryParam(queryObj)}`
  );
};
export {
  getOragnizationData,
  getOragnizations,
  searchOragnizations,
  filterOragnizations,
  updateOrganizationName
};
