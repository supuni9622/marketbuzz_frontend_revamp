export enum UserRole {
  USER = "USER",
  SUPERADMIN = "SUPERADMIN"
}

export const Constants = {
  REACT_APP_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://app.staging.marketbuzz.ai/',
  FRONTEND_URL: process.env.NEXT_APP_FRONTNEND_URL || 'http://localhost:3000/',
  PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3001',
  API_URL: process.env.NEXT_APP_API_URL || 'https://api-node.themesbrand.website',
  WEBSOCKET_BASE_URL: process.env.NEXT_APP_WEBSOCKET_BASE_URL || 'ws://localhost:8080/ws',
  CLOVER_APP_ID_CRM: process.env.CLOVER_APP_ID_CRM || 'MH65V8NNT0D36',
  CLOVER_APP_ID_ANALYTICS: process.env.CLOVER_APP_ID_ANALYTICS || 'WS259S5ZWB4HC',
  DEFAULT_AUTH: process.env.NEXT_APP_DEFAULTAUTH || 'fake',
  GENERATE_SOURCEMAP: process.env.GENERATE_SOURCEMAP === 'true',
} as const

export enum WebsocketMessageAction { //TODO: Need to refer from types. For some reason, it gives an error at the moment
  GET_SYNC_PROGRESS = "GET_SYNC_PROGRESS"
}
export const GTM = {
  events: {
    loginEvent: "loginEvent",
    logoutEvent: "logoutEvent",
    userProfileUpdateEvent: "userProfileUpdateEvent",
    campaignCreatedEvent: "campaignCreatedEvent"
  }
};