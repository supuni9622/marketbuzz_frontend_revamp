// Campaign Types
export interface CampaignReport {
  processedMessageCount: number;
  sentMessageCount: number;
}

export interface CampaignModel {
  id: string;
  name: string;
  content: string;
  createdOn: string;
  status: string;
  report?: CampaignReport;
}

export interface TemplateModel {
  id: string;
  name: string;
  messageBody: string;
  type: string;
  isNewTemplate: boolean;
  costPerMessage: number;
}

export interface GetRequest {
  limit: number;
  skip: number;
  type?: string;
}

export interface GetResponse<T> {
  items: T[];
  count: number;
}

export interface CountResponse {
  count: number;
} 