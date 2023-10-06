import io, { Socket } from 'socket.io-client'
import { config } from "../utils"

const socketConnection = {
  getSocket: () => {
    return io(config.url.websocket)
  },
  editorEmissions: {
    GET_DOCUMENT: 'GET_DOCUMENT',
    LOAD_DOCUMENT: 'LOAD_DOCUMENT',
    SEND_DOCUMENT_CONTENT_CHANGES: 'SEND_DOCUMENT_CONTENT_CHANGES',
    RECEIVE_DOCUMENT_CONTENT_CHANGES: 'RECEIVE_DOCUMENT_CONTENT_CHANGES',
    SEND_DOCUMENT_SELECTION: 'SEND_DOCUMENT_SELECTION',
    RECEIVE_DOCUMENT_SELECTION: 'RECEIVE_DOCUMENT_SELECTION',
    CLIENT_DISCONNECTED: 'CLIENT_DISCONNECTED',
  },
}

export type EditorSocket = Socket

export default socketConnection
