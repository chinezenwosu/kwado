const env = import.meta.env

const config = {
  url: {
    api: env.VITE_API_URL as string,
    websocket: env.VITE_SERVER_URL as string,
  },
  fetch: {
    clientHeader: env.VITE_API_CLIENT_HEADER as string,
  }
}

export default config
