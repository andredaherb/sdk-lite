import { ConnectionConfig } from './config'
import getCryptumApi from './cryptum-api-instance'

export interface TokenInfoInput {
  tokenAddress: string
  protocol: string
}
export const getTokenInfoBuilder = async (
  { tokenAddress, protocol }: TokenInfoInput,
  config: ConnectionConfig
) => {
  // if (protocol === 'HATHOR') {
  //   !==
  // }
  try {
    const res = await getCryptumApi(config).get(
      `/token/${tokenAddress}/info?protocol=${protocol}`
    )
    return res.data
  } catch (e) {
    console.log(e)
  }
}
