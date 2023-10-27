import axios from 'axios'
import { config } from '../utils'

export type Response = {
	data?: unknown
	error?: unknown
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
