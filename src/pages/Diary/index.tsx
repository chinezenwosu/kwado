import { useState, useEffect, useMemo, useContext } from 'react'
import io, { Socket } from 'socket.io-client'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { config } from '../../utils'
import randomColor from 'randomcolor'
import {
  Grid,
  Instance,
  Title,
  H4,
} from './Components'
import 'react-quill/dist/quill.snow.css'
import TextEditor from './components/TextEditor'
import Toolbar from './components/Toolbar'

const socketEmissions = {
  GET_DOCUMENT: 'GET_DOCUMENT',
  LOAD_DOCUMENT: 'LOAD_DOCUMENT',
  SEND_DOCUMENT_CONTENT_CHANGES: 'SEND_DOCUMENT_CONTENT_CHANGES',
  RECEIVE_DOCUMENT_CONTENT_CHANGES: 'RECEIVE_DOCUMENT_CONTENT_CHANGES',
}

const fetchState = {
  LOADING: 0,
  MISSING: 1,
  EXISTS: 2,
}

const Diary = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [document, setDocument] = useState(null)
  const [fetchStatus, setFetchStatus]  = useState(fetchState.LOADING)
  const { slug = '' } = useParams()
  const { user } = useContext(AuthContext)
  const { firstName = '', lastName = '' } = user || {}
  const name = `${firstName} ${lastName}`.trim()

  const color = useMemo(
    () =>
      randomColor({
        luminosity: 'dark',
        format: 'rgba',
        alpha: 1
      }),
    []
  )

  useEffect(() => {
    const soc = io(config.url.websocket)
    setSocket(soc)

    return () => {
      soc.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket === null) return

    socket.emit(socketEmissions.GET_DOCUMENT, slug)

    socket.once(socketEmissions.LOAD_DOCUMENT, (data) => {
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
        <Title>
          <H4>Editor: {name}</H4>
        </Title>
        <Toolbar />
        <TextEditor socket={socket} document={document} />
      </Instance>
    </Grid>
  )
}

export default Diary
