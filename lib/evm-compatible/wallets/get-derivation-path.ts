import { Protocol } from '../../builder'

const fixedPurposeBip44 = 44
const externalChainChange = '0'

interface DerivationPathParameters {
  protocol: Protocol
  account: number
  address: number
}

type CoinMapType = { [K in Protocol]: string }
const protocolToDerivationPathCoinMap: CoinMapType = {
  BITCOIN: '0',
  ETHEREUM: '60',
  POLYGON: '60', // made up
  CELO: '52752',
  HATHOR: '280',
  CARDANO: '1852',
  AVALANCHE: '9000',
  SOLANA: '501',
}

const getDerivationPath = ({
  protocol,
  account = 0,
  address = 0,
}: DerivationPathParameters) =>
  `m/${fixedPurposeBip44}'/${
    protocolToDerivationPathCoinMap[protocol]
  }'/${String(account)}'/${externalChainChange}/${String(address)}`

export default getDerivationPath
