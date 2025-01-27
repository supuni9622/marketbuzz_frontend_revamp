import TagManager from "react-gtm-module";
import { GTM, UserRole } from "@/constants";

// Declare global dataLayer type
declare global {
  interface Window {
    dataLayer?: any[]
  }
}

interface GTMEvent {
  event: string;
  params?: object;
}

interface GTMAuthEvent {
  //Login and Logout
  organizationId: string;
  role: string;
}

interface GTMUserProfileUpdateEvent {
  organizationId: string;
  name: string;
  country: string;
  timeZone: string;
  status: string;
  createdOn: Date;
  featureList?: string;
  credits?: number;
  address?: {
    address1: string;
    city: string;
    country: string;
    state: string;
    zip: string;
  };
  phoneNumber?: string;
  employeesCount?: number;
  isBillable?: boolean;
  ownerDetails?: {
    name: string;
    email: string;
  };
}

interface GTMCampaignEvent {
  campaignId: string;
  campaignName: string;
  campaignType: string;
  campaignChannel: string;
  campaignCreatedOn: Date;
  campaignActualCost?: number;
}

class GTMService {
  public static createGTMEvent({ event, params = {} }: GTMEvent) {
    TagManager.dataLayer({
      dataLayer: {
        event: event,
        ...params
      }
    });
  }

  public static loginEvent(params: GTMAuthEvent) {
    this.createGTMEvent({ event: GTM.events.loginEvent, params });
  }

  public static logoutEvent(params: GTMAuthEvent) {
    this.createGTMEvent({ event: GTM.events.logoutEvent, params });
  }

  public static userProfileUpdateEvent(params: GTMUserProfileUpdateEvent) {
    this.createGTMEvent({ event: GTM.events.userProfileUpdateEvent, params });
  }

  public static campaignCreatedEvent(params: GTMCampaignEvent) {
    this.createGTMEvent({ event: GTM.events.campaignCreatedEvent, params });
  }
}

export default GTMService;
