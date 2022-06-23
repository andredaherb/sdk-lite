import buildSdk, { SdkConfig } from "./builder"

const testConfig: SdkConfig = {
  apiKey: '',
  environment: 'testnet',
  protocol: 'CELO',
  tokenAddresses: [],
}

const sdk = buildSdk(testConfig)
const wallet = sdk.createWallet()

sdk.getWalletInfo(wallet.address).then(r => console.log(r))