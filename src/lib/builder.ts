import { ConnectionConfig } from './api/config'
import createEthCompatibleWallet from './evm-compatible/create-wallet'
import buildGetFee from './evm-compatible/get-fee'
import buildGetWalletInfo from './evm-compatible/get-wallet-info'

export interface ProtocolConfig {
  protocol: 'CELO' | 'ETHEREUM' | 'POLYGON'
  tokenAddresses: string[]
}

export type SdkConfig = ProtocolConfig & ConnectionConfig

const buildSdk = (config: SdkConfig) => {
  return {
    createWallet: createEthCompatibleWallet,
    getWalletInfo: buildGetWalletInfo(config),
    getFee: buildGetFee(config),
  }
}

export default buildSdk
