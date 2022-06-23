import axios from 'axios'
import { ConnectionConfig, getBaseUrl } from './config'

const getCryptumApi = (config: ConnectionConfig) =>
  axios.create({
    baseURL: getBaseUrl('testnet'),
    headers: {
      'x-api-key': config.apiKey,
    },
  })

export default getCryptumApi
