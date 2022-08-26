import { SdkConfig } from '../builder'
import getCryptumAxiosInstance from './cryptum-api-instance'

interface WalletInfoInput {
  address: string
}

export type RawWalletInfoInput = {
  tokenAddresses?: string[]
} & WalletInfoInput

interface NativeAssetBalance {
  asset: string
  amount: string
}

interface TokenBalance {
  symbol: string
  address: string
  amount: string
  decimals: string
}

interface WalletInfo {
  nonce: number
  address: string
  link: string
  balances: (NativeAssetBalance | TokenBalance)[]
}

export const getWalletInfoBuilder = async (
  { address, tokenAddresses = [] }: RawWalletInfoInput,
  config: SdkConfig
): Promise<WalletInfo> => {
  const qs = [
    `protocol=${config.protocol.protocol}`,
    ...tokenAddresses.map(address => `tokenAddresses[]=${address}`),
  ]
  const res = await getCryptumAxiosInstance(config.connection).get(
    `/wallet/${address}/info?${qs.join('&')}`
  )
  return res.data
}
