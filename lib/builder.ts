import getCryptumApi from './api'
import { ConnectionConfig } from './api/config'
import buildCreateWallet from './evm-compatible/create-wallet'
import buildTransfer from './evm-compatible/transfer'

export type Protocol =
  | 'BITCOIN'
  | 'CELO'
  | 'ETHEREUM'
  | 'HATHOR'
  | 'CARDANO'
  | 'POLYGON'
  | 'AVALANCHE'
  | 'SOLANA'

export interface ProtocolConfig {
  protocol: Protocol
  tokenAddresses: string[]
}

export type SdkConfig = {
  protocol: ProtocolConfig
  connection: ConnectionConfig
}

const buildSdk = (config: SdkConfig) => {
  const cryptumApi = getCryptumApi(config)
  return {
    createWallet: buildCreateWallet(config.protocol.protocol),
    transfer: buildTransfer(config),
    ...cryptumApi,
  }
}

export default buildSdk
