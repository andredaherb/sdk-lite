import Wallet from 'ethereumjs-wallet'

const createEthCompatibleWallet = () => {
  const wallet = Wallet.generate()
  return {
    address: wallet.getAddressString().toLowerCase(),
    privateKey: wallet.getPrivateKeyString(),
    publicKey: wallet.getPublicKeyString(),
  }
}

export default createEthCompatibleWallet
