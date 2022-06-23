import getCryptumApi from '../api/cryptum-api'
import { SdkConfig } from '../builder'

interface WalletInfoInput {
  address: string
}

type RawWalletInfoInput = {
  protocol: 'CELO' | 'ETHEREUM' | 'POLYGON'
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

const getWalletInfo = async ({
  address,
  protocol,
  tokenAddresses = [],
}: RawWalletInfoInput): Promise<WalletInfo> => {
  const qs = [
    `protocol=${protocol}`,
    ...tokenAddresses.map(address => `tokenAddresses[]=${address}`),
  ]
  const res = await getCryptumApi().get(
    `/wallet/${address}/info?${qs.join('&')}`
  )
  return res.data
}

const buildGetWalletInfo =
  (config: SdkConfig) =>
  (address: string) =>
    getWalletInfo({
      address,
      protocol: config.protocol,
      tokenAddresses: config.tokenAddresses,
    })

export default buildGetWalletInfo
