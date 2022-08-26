import { hdkey } from 'ethereumjs-wallet'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'
import getDerivationPath from './wallets/get-derivation-path'
import { Protocol } from '../builder'
// Mnemonic is core for HD wallets

const createWallet = (protocol: Protocol) => {
  const mnemonic = generateMnemonic() // diferente pra cada network?
  const derivedPath = hdkey
    .fromMasterSeed(mnemonicToSeedSync(mnemonic))
    .derivePath(getDerivationPath({ protocol, account: 0, address: 0 }))

  const wallet = derivedPath.getWallet()

  // TODO: Software should prevent a creation of an account if a previous account does not have a transaction history (meaning none of its addresses have been used before).

  // TODO in somewhere else: Software needs to discover all used accounts after importing the seed from an external source. Such an algorithm is described in "Account discovery" chapter.

  return {
    mnemonic,
    address: wallet.getAddressString().toLowerCase(),
    privateKey: wallet.getPrivateKeyString(),
    publicKey: wallet.getPublicKeyString(),
    xpub: derivedPath.publicExtendedKey().toString('hex'),
  }
}

const buildCreateWallet = (protocol: Protocol) => () => createWallet(protocol)

export default buildCreateWallet
