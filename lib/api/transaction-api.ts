import { SdkConfig } from '../builder'
import getCryptumAxiosInstance from './cryptum-api-instance'

export interface SendTransactionInput {
  signedTx: string
  type: string
}

export const sendTransactionBuilder = async (
  config: SdkConfig,
  transaction: SendTransactionInput
) => {
  // validateSignedTransaction(transaction)
  const service = getCryptumAxiosInstance(config.connection)
  const { signedTx, type } = transaction
  const response = await service.post(
    '/transaction',
    { signedTx, type },
    {
      params: { protocol: config.protocol.protocol },
    }
  )
  return response.data
}
