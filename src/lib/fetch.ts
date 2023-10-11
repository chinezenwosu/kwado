import axios from 'axios'
import { config } from '../utils'

export type Response = {
  data?: any,
  error?: any,
}

const instance = axios.create({
  baseURL: config.url.api,
  headers: {
    [config.fetch.clientHeader]: true,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default instance
