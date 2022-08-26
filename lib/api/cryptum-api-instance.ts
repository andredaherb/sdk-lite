import axios from 'axios'
import { ConnectionConfig, getBaseUrl } from './config'

const getCryptumAxiosInstance = (config: ConnectionConfig) =>
  axios.create({
    baseURL: getBaseUrl('testnet'),
    headers: {
      'x-api-key': config.apiKey,
    },
  })

export default getCryptumAxiosInstance
