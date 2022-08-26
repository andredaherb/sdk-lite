// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3')
import { TRANSFER_METHOD_ABI } from '../abis'
import { POLYGON_COMMON_CHAIN } from '../abis/chains'
import { toWei } from '../utils'
import EthereumCommon from '@ethereumjs/common'
import { Transaction as EthereumTransaction } from '@ethereumjs/tx'
import { SdkConfig } from '../builder'
import BigNumber from 'bignumber.js'
import Wallet from 'ethereumjs-wallet'
import getCryptumApi from '../api'
import { getFee } from '../api/fee-api'
// const transfer = () => {}

interface SignedTransaction {
  signedTx: string
  protocol: string
  type: string
}

interface BuildTransferTransactionInput {
  fromPrivateKey: string
  nonce: number
  tokenSymbol: string
  contractAddress: string
  amount: string
  destination: string
  fee: {
    gas: string
    gasPrice: string
    chainId: number
  }
  testnet: boolean
  decimals: number
}
const buildPolygonTransferTransaction = function (
  {
    fromPrivateKey,
    nonce,
    tokenSymbol,
    contractAddress,
    amount,
    destination,
    fee,
    testnet,
    decimals,
  }: BuildTransferTransactionInput,
  config: SdkConfig
) {
  const { gas, gasPrice, chainId } = fee
  const web3 = new Web3('ws://localhost:8546')

  const rawTransaction = {
    chainId,
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(gasPrice),
    to: '',
    value: undefined as any,
    data: undefined as any,
    gasLimit: web3.utils.toHex(new BigNumber(gas).plus(100000).toString()),
  }
  const value = toWei(amount, decimals)
  // if (tokenSymbol === 'MATIC') {
  //   rawTransaction.to = destination
  //   rawTransaction.value = Web3.utils.toHex(value)
  // } else {
  rawTransaction.to = contractAddress
  const token = new web3.eth.Contract(TRANSFER_METHOD_ABI, rawTransaction.to)
  rawTransaction.data = token.methods.transfer(destination, value).encodeABI()
  const tx = new EthereumTransaction(rawTransaction, {
    common: EthereumCommon.custom({
      chainId:
        POLYGON_COMMON_CHAIN[config.connection.environment].chain.chainId,
    }),
  })

  const signedTx = tx.sign(Buffer.from(fromPrivateKey.substring(2), 'hex'))
  return `0x${signedTx.serialize().toString('hex')}`
}

interface CreatePolygonTransferTranscationInput {
  privateKey: string
  tokenSymbol: string
  amount: string
  destination: string
  contractAddress: string
}

export const transfer = async (
  {
    privateKey,
    tokenSymbol,
    amount,
    destination,
    contractAddress,
  }: CreatePolygonTransferTranscationInput,
  config: SdkConfig
): Promise<string> => {
  // validateEthereumTransferTransactionParams(input)
  const protocol = config.protocol.protocol
  // let decimals
  // if (tokenSymbol !== 'ETH') {
  // ;({ decimals } = await getInfo({
  //   tokenAddress: contractAddress,
  //   protocol,
  // })
  // }
  const { decimals } = await getCryptumApi(config).getTokenInfo({
    tokenAddress: contractAddress,
    protocol,
  })

  const feeInfo = await getFee(
    {
      protocol: config.protocol.protocol,
      type: 'TRANSFER',
      from: Wallet.fromPrivateKey(
        Buffer.from(privateKey.substring(2), 'hex')
      ).getAddressString(),
      destination,
    },
    config.connection
  )

  const { nonce } = await getCryptumApi(config).getWalletInfo({
    address: Wallet.fromPrivateKey(
      Buffer.from(privateKey.substring(2), 'hex')
    ).getAddressString(),
  })
  // const { info, networkFee } = await this._getFeeInfo({
  //   wallet,
  //   type: tokenSymbol === 'MATIC' ? 'TRANSFER' : 'CALL_CONTRACT_METHOD',
  //   destination,
  //   amount: tokenSymbol === 'MATIC' ? amount : null,
  //   contractAddress,
  //   contractAbi: tokenSymbol === 'MATIC' ? null : TRANSFER_METHOD_ABI,
  //   method: tokenSymbol === 'MATIC' ? null : 'transfer',
  //   params:
  //     tokenSymbol === 'MATIC'
  //       ? null
  //       : [destination, toWei(amount, decimals).toString()],
  //   fee,
  //   protocol,
  // })
  const signedTx = buildPolygonTransferTransaction(
    {
      fromPrivateKey: privateKey,
      tokenSymbol,
      amount,
      destination,
      fee: feeInfo,
      nonce,
      testnet: config.connection.environment === 'testnet',
      contractAddress,
      decimals,
    },
    config
  )

  const res = await getCryptumApi(config).sendTransaction({
    signedTx,
    type: 'TRANSFER',
  })
  return res.hash
}

export default (config: SdkConfig) =>
  (input: CreatePolygonTransferTranscationInput) =>
    transfer(input, config)
