const config = {
  url: {
    api: import.meta.env.VITE_API_URL as string,
    websocket: import.meta.env.VITE_WEBSOCKET_URL as string,
  }
}

export default config
