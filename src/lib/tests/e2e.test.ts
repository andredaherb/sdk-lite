import buildSdk, { SdkConfig } from '../builder'

describe('SDK lite', () => {
  const testConfig: SdkConfig = {
    apiKey: 'KfVzF8Vb3Rk5XZYuyPDwIvku4WmCayL7',
    environment: 'testnet',
    protocol: 'CELO',
    tokenAddresses: [],
  }

  const fixedTestWallet = {
    address: '0xb97e292ba25fd9c09a926360e4c94aee95d9bfff',
    privateKey:
      '0x2ee1eb41215f83dfc59db1b1921bd18438a952444b008934d334a0225131144c',
    publicKey:
      '0x56731bf68bf4d38a15668268c3b580d7e2c46a807f22ab2afc8522aa3cb5b9bfb4218d04ceb678237ed2f4c6b429a427583be42d9bda556c23cba99c2c1574db',
  }

  const sdk = buildSdk(testConfig)

  it('should create a new wallet', () => {
    const wallet = sdk.createWallet()
    expect(wallet).toHaveProperty('address')
    expect(wallet).toHaveProperty('privateKey')
  })

  it('should get wallet info', async () => {
    const balance = await sdk.getWalletInfo(fixedTestWallet.address)
    expect(balance).toEqual({
      address: '0xb97e292ba25fd9c09a926360e4c94aee95d9bfff',
      balances: [
        {
          amount: '0',
          asset: 'CELO',
        },
      ],
      link: 'https://alfajores-blockscout.celo-testnet.org/address/0xb97e292ba25fd9c09a926360e4c94aee95d9bfff',
      nonce: 0,
    })
  })
})
