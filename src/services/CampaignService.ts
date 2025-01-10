import { fetchGet,
  fetchPost,
  fetchPut,
  jsonToQueryParam } from "./CommonServiceUtils";
import { Constants } from "@/constants";
import type {
  GetRequest,
  GetResponse,
  CountResponse,
  CampaignModel,
  TemplateModel
} from "@/types/campaign";

const getCampaignTemplates = (
  queryObj: GetRequest
): Promise<GetResponse<TemplateModel>> => {
  // Ensure limit and skip are numbers
  const params = {
    limit: Number(queryObj.limit),
    skip: Number(queryObj.skip),
    ...(queryObj.type && { type: queryObj.type })
  };
  
  const queryString = jsonToQueryParam(params);
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}campaigns/templates?${queryString}`
  );
};

const getCampaigns = (
  queryObj: GetRequest
): Promise<GetResponse<CampaignModel>> => {
  // Ensure limit and skip are numbers
  const params = {
    limit: Number(queryObj.limit),
    skip: Number(queryObj.skip),
    ...(queryObj.type && { type: queryObj.type })
  };
  
  const queryString = jsonToQueryParam(params);
  return fetchGet(
    `${Constants.REACT_APP_API_BASE_URL}campaigns?${queryString}`
  );
};

const getCampaignsCount = (): Promise<CountResponse> => {
  return fetchGet(`${Constants.REACT_APP_API_BASE_URL}campaigns/count`);
};

const updateCampaign = async (
  payload: Partial<CampaignModel>,
  campaignId: string
): Promise<CampaignModel> => {
  return fetchPut(
    `${Constants.REACT_APP_API_BASE_URL}campaigns/${campaignId}`,
    payload
  );
};

const regenerateContent = (
  payload: { campaignId: string }
): Promise<{ content: string }> => {
  return fetchPost(
    `${Constants.REACT_APP_API_BASE_URL}campaigns/content-suggesion`,
    payload
  );
};

const createCampaign = async (
  payload: Omit<CampaignModel, 'id' | 'createdOn' | 'report'>
): Promise<CampaignModel> => {
  return await fetchPost(
    `${Constants.REACT_APP_API_BASE_URL}campaigns`,
    payload
  );
};

export const CampaignService = {
  getCampaignTemplates,
  getCampaigns,
  createCampaign,
  regenerateContent,
  getCampaignsCount,
  updateCampaign
}; 