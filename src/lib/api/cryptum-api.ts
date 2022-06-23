import axios from 'axios'
import { getBaseUrl } from './config'

const getCryptumApi = () =>
  axios.create({
    baseURL: getBaseUrl('testnet'),
    headers: {
      'x-api-key': 'KfVzF8Vb3Rk5XZYuyPDwIvku4WmCayL7',
    },
  })

export default getCryptumApi
