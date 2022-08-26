import { SdkConfig } from '../builder'
import { getTokenInfoBuilder, TokenInfoInput } from './token-api'
import { sendTransactionBuilder, SendTransactionInput } from './transaction-api'
import { getWalletInfoBuilder, RawWalletInfoInput } from './wallet-api'

const getCryptumApi = (config: SdkConfig) => ({
  getTokenInfo: (input: TokenInfoInput) =>
    getTokenInfoBuilder(input, config.connection),
  getWalletInfo: (input: RawWalletInfoInput) =>
    getWalletInfoBuilder(input, config),
  sendTransaction: (input: SendTransactionInput) =>
    sendTransactionBuilder(config, input),
})

export default getCryptumApi
