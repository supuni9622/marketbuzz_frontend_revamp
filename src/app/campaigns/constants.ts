export enum CampaignChannel {
    EMAIL = "EMAIL",
    SMS = "SMS"
  }
  
  export enum CampaignName {
    GENERAL_PROMOTIONS = "GENERAL PROMOTIONS",
    CUSTOMER_APPRECIATION = "CUSTOMER APPRECIATION",
    LIMITED_TIME_OFFER = "LIMITED TIME OFFER",
    BUY_ONE_GET_ONE = "BUY ONE GET ONE",
    PRODUCT_ANNOUNCEMENT = "PRODUCT ANNOUNCEMENT",
    STORE_EVENTS = "STORE EVENTS",
    COMMUNITY_SUPPORT = "COMMUNITY SUPPORT",
    SEASONAL_GREETING = "SEASONAL GREETING"
  }
  
  export enum CampaignType {
    BROADCAST = "BROADCAST",
    EVENT = "EVENT" //For an unknown reason, these enums cant be exported from types repo.
  }
  
  export enum CampaignStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    DRAFT = "DRAFT",
    RUNNING = "RUNNING",
    SCHEDULED = "SCHEDULED",
    CHARGING_FAILED = "CHARGING FAILED",
    CHARGED = "CHARGED",
    BUILD = "BUILD",
    COMPLETED = "COMPLETED",
    ACTIVE = "ACTIVE", // For Event campaigns
    INACTIVE = "INACTIVE" // For Event campaigns
  }
  
  export enum EventType {
    TRANSACTION_CREATED = "TRANSACTION_CREATED",
    TRANSACTION_UPDATED = "TRANSACTION_UPDATED",
    CUSTOMER_CREATED = "CUSTOMER_CREATED",
    CUSTOMER_UPDATED = "CUSTOMER_UPDATED",
    CUSTOMER_BIRTHDAY = "CUSTOMER_BIRTHDAY",
    CUSTOMER_LAPSED = "CUSTOMER_LAPSED",
    FIRST_PURCHASE = "FIRST_PURCHASE"
  }
  