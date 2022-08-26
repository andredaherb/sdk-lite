// import { SdkConfig } from '../builder'

// interface WalletInfoInput {
//   address: string
// }

// type RawWalletInfoInput = {
//   tokenAddresses?: string[]
//   config: SdkConfig
// } & WalletInfoInput

// interface NativeAssetBalance {
//   asset: string
//   amount: string
// }

// interface TokenBalance {
//   symbol: string
//   address: string
//   amount: string
//   decimals: string
// }

// interface WalletInfo {
//   nonce: number
//   address: string
//   link: string
//   balances: (NativeAssetBalance | TokenBalance)[]
// }

// const getWalletInfo = async ({
//   address,
//   tokenAddresses = [],
//   config,
// }: RawWalletInfoInput): Promise<WalletInfo> => {
//   const qs = [
//     `protocol=${config.protocol}`,
//     ...tokenAddresses.map(address => `tokenAddresses[]=${address}`),
//   ]
//   const res = await getCryptumApi(config.connection).get(
//     `/wallet/${address}/info?${qs.join('&')}`
//   )
//   return res.data
// }

// const buildGetWalletInfo = (config: SdkConfig) => (address: string) =>
//   getWalletInfo({
//     address,
//     tokenAddresses: config.protocol.tokenAddresses,
//     config,
//   })

// export default buildGetWalletInfo
