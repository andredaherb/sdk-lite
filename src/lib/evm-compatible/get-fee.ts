import { Protocol } from '../api/config'
import getCryptumApi from '../api/cryptum-api'
import { SdkConfig } from '../builder'

interface TransferFeeInput {
  type: 'TRANSFER'
  from?: string
  destination?: string
}

interface DeployErc20FeeInput {
  type: 'DEPLOY_ERC20'
  tokenType: 'ERC20'
  params: string[3]
  from: string
}

const getFee = async (
  txData: TransferFeeInput | DeployErc20FeeInput,
  protocol: Protocol
) => {
  try {
    const response = await getCryptumApi().post(
      `/fee?protocol=${protocol}`,
      txData
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const buildGetFee =
  (config: SdkConfig) => (txData: TransferFeeInput | DeployErc20FeeInput) =>
    getFee(txData, config.protocol)

export default buildGetFee
