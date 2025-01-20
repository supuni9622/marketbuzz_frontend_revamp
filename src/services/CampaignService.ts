import {
  fetchGet,
  fetchPost,
  fetchPut,
  jsonToQueryParam
} from "./CommonServiceUtils";
import { Constants } from "@/constants";
import {
  TCampaignGetRequest,
  TCampaignGetResponse,
  TCampaignCreateRequest,
  TCampaignCreateResponse,
  TContentSuggestionRequest,
  TContentSuggestionResponse,
  TCampaignsCountResponse,
  TCampaignUpdateRequest,
  TCampaignUpdateResponse,
  TTemplateGetRequest,
  TTemplateGetResponse
} from "@shoutout-labs/market_buzz_crm_types";

const getCampaigns = (
  queryObj: TCampaignGetRequest
): Promise<TCampaignGetResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}campaigns?${jsonToQueryParam(queryObj)}`
  );
};

const getCampaignsCount = (): Promise<TCampaignsCountResponse> => {
  return fetchGet(`${Constants.REACT_APP_API_BASE_URL}campaigns/count`);
};

const createCampaign = async (
  payload: TCampaignCreateRequest
): Promise<TCampaignCreateResponse> => {
  return await fetchPost(
    `${Constants.REACT_APP_API_BASE_URL}campaigns`,
    payload
  );

};

const updateCampaign = async (
  payload: TCampaignUpdateRequest,
  campaignId: string
): Promise<TCampaignUpdateResponse> => {
  return fetchPut(
    `${Constants.REACT_APP_API_BASE_URL}campaigns/${campaignId}`,
    payload
  );
};

const regenerateContent = (
  payload: TContentSuggestionRequest
): Promise<TContentSuggestionResponse> => {
  return fetchPost(
    `${Constants.REACT_APP_API_BASE_URL}campaigns/content-suggesion`,
    payload
  );
};

const getTemplates = (
  queryObj: TTemplateGetRequest
): Promise<TTemplateGetResponse> => {
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}campaigns/templates?${jsonToQueryParam(queryObj)}`
  );
};

export {
  getCampaigns,
  createCampaign,
  regenerateContent,
  getCampaignsCount,
  updateCampaign,
  getTemplates
};