import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DeltaStatic } from 'quill'
import { Grid, Instance } from './Components'
import Toolbar from './components/Toolbar'
import TextEditor from './components/TextEditor'
import socketConnection, { EditorSocket } from '../../lib/socketConnection'
import 'react-quill/dist/quill.snow.css'

const fetchState = {
  LOADING: 0,
  MISSING: 1,
  EXISTS: 2,
}

const Diary = () => {
  const [socket, setSocket] = useState<EditorSocket | null>(null)
  const [document, setDocument] = useState<DeltaStatic | null>(null)
  const [fetchStatus, setFetchStatus]  = useState(fetchState.LOADING)
  const { slug = '' } = useParams()

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

    socket.once(socketConnection.editorEmissions.LOAD_DOCUMENT, (data) => {
      if (!data) {
        setFetchStatus(fetchState.MISSING)
        return
      }

      setFetchStatus(fetchState.EXISTS)
      setDocument(data)
    })
  }, [socket])

  if (fetchStatus === fetchState.MISSING) return <h4>Document does not exist</h4>
  if (socket === null || fetchStatus === fetchState.LOADING || document === null) return null

  return (
    <Grid>
      <Instance online={socket.connected}>
        <Toolbar />
        <TextEditor
          socket={socket}
          document={document}
        />
      </Instance>
    </Grid>
  )
}

export default Diary
