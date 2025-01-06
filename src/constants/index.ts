export const Constants = {
  REACT_APP_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/',
  FRONTEND_URL: process.env.NEXT_APP_FRONTNEND_URL || 'http://localhost:3000/',
  PUBLIC_URL: process.env.PUBLIC_URL || 'http://localhost:3001',
  API_URL: process.env.NEXT_APP_API_URL || 'https://api-node.themesbrand.website',
  WEBSOCKET_BASE_URL: process.env.NEXT_APP_WEBSOCKET_BASE_URL || 'ws://localhost:8080/ws',
  CLOVER_APP_ID_CRM: process.env.CLOVER_APP_ID_CRM || 'MH65V8NNT0D36',
  CLOVER_APP_ID_ANALYTICS: process.env.CLOVER_APP_ID_ANALYTICS || 'WS259S5ZWB4HC',
  DEFAULT_AUTH: process.env.NEXT_APP_DEFAULTAUTH || 'fake',
  GENERATE_SOURCEMAP: process.env.GENERATE_SOURCEMAP === 'true',
} as const

export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER'
} 