export type EnvironmentConfig = 'testnet' | 'mainnet'

export interface ConnectionConfig {
  apiKey: string
  environment: EnvironmentConfig
}

export type Protocol = 'CELO' | 'ETHEREUM' | 'POLYGON'

export const getBaseUrl = (environment: EnvironmentConfig) => {
  if (environment === 'testnet') return 'https://api-hml.cryptum.io'
  if (environment === 'mainnet') return 'https://api.cryptum.io'

  throw new Error(`Unknown environment ${environment}.`)
}
