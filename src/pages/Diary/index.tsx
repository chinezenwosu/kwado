import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { DeltaStatic } from 'quill'
import Toolbar from './components/Toolbar'
import TextEditor from './components/TextEditor'
import socketConnection, { EditorSocket } from '../../lib/socketConnection'
import 'react-quill/dist/quill.snow.css'

const fetchState = {
  LOADING: 0,
  MISSING: 1,
  EXISTS: 2,
  REVOKED: 3,
}

const Diary = () => {
  const [socket, setSocket] = useState<EditorSocket | null>(null)
  const [document, setDocument] = useState<DeltaStatic | null>(null)
  const [fetchStatus, setFetchStatus]  = useState(fetchState.LOADING)
  const fetchStatusRef = useRef(fetchStatus)
  const { slug = '' } = useParams()

  const setFetchStatusAndRef = (state) => {
    setFetchStatus(state)
    fetchStatusRef.current = state
  }

  useEffect(() => {
    const editorSocket = socketConnection.getSocket()
    setSocket(editorSocket)

    return () => {
      editorSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket === null) return
    
    socket.emit(socketConnection.editorEmissions.GET_DOCUMENT, slug)

    socket.on(socketConnection.editorEmissions.LOAD_DOCUMENT, (data) => {
      if (!data) {
        if (fetchStatusRef.current === fetchState.EXISTS) {
          setFetchStatusAndRef(fetchState.REVOKED)
        } else {
          setFetchStatusAndRef(fetchState.MISSING)
        }

        return
      }

      setFetchStatusAndRef(fetchState.EXISTS)
      setDocument(data)
    })
  }, [socket])

  if (fetchStatus === fetchState.MISSING) {
    return <h4>Document does not exist</h4>
  }

  if (fetchStatus === fetchState.REVOKED) {
    return <h4>You no longer have access to this kwadoc</h4>
  }

  if (socket === null || fetchStatus === fetchState.LOADING || document === null) {
    return null
  }

  return (
    <>
      <Toolbar />
      <TextEditor
        socket={socket}
        document={document}
      />
    </>
  )
}

export default Diary
