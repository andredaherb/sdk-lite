import { ConnectionConfig } from './config'
import getCryptumAxiosInstance from './cryptum-api-instance'

interface TransferFeeInput {
  protocol: string
  type: 'TRANSFER'
  from?: string
  destination?: string
}

interface DeployErc20FeeInput {
  type: 'DEPLOY_ERC20'
  tokenType: 'ERC20'
  protocol: string
  params: string[3]
  from: string
}

export const getFee = async (
  txData: TransferFeeInput | DeployErc20FeeInput,
  config: ConnectionConfig
) => {
  try {
    const response = await getCryptumAxiosInstance(config).post(
      `/fee?protocol=${txData.protocol}`,
      txData
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}
