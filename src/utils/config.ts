const config = {
  url: {
    api: process.env.REACT_APP_API_URL as string,
    websocket: process.env.REACT_APP_WEBSOCKET_URL as string,
  }
}

export { config }
