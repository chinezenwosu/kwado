import { useState, useEffect, useMemo, useContext } from 'react'
import { BaseEditor, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { ReactEditor, withReact } from 'slate-react'
import { useParams } from 'react-router-dom'
import { withLinks } from '../../plugins/link'
import { WebsocketProvider } from 'y-websocket'
import { AuthContext } from '../../context/AuthContext'
import { config } from '../../utils'
import * as Y from 'yjs'
import randomColor from 'randomcolor'
import EditorFrame from './EditorFrame'
import {
  Grid,
  Instance,
  Title,
  Button,
  H4,
} from './Components'
import {
  CursorEditor,
  SyncElement,
  withCursor,
  withYjs,
} from 'slate-yjs'

const fetchState = {
  LOADING: 0,
  EMPTY: 1,
  DONE: 2,
}

const Diary = () => {
  const [isOnline, setOnlineState] = useState<boolean | null>(null)
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

  const [sharedType, provider] = useMemo(() => {
    const doc = new Y.Doc()
    const sharedType = doc.getArray<SyncElement>('content')
    const provider = new WebsocketProvider(config.url.websocket, slug, doc, {
      connect: false,
    })

    return [sharedType, provider]
  }, [slug])

  const editor = useMemo(() => {
    const editor = withCursor(
      withYjs(withLinks(withReact(withHistory(createEditor()))), sharedType),
      provider.awareness
    )

    return editor
  }, [])

  useEffect(() => {
    provider.on('status', ({ status }: { status: string }) => {
      const isConnected = status === 'connected'
      setOnlineState(isConnected)

      if (isConnected && fetchStatus === fetchState.LOADING) {
        setFetchStatus(fetchState.DONE)
      }
    })

    provider.awareness.setLocalState({
      alphaColor: color.slice(0, -2) + '0.2)',
      color,
      name,
    })

    provider.connect()

    provider.on('sync', async (isSynced: boolean) => {
      if (sharedType.length === 0) {
        setFetchStatus(fetchState.EMPTY)
      }
    })
  }, [])

  const toggleOnline = () => {
    const { connect, disconnect } = provider
    isOnline ? disconnect() : connect()
  }

  if (fetchStatus === fetchState.LOADING) return null
  if (!isOnline || fetchStatus === fetchState.EMPTY) return <h4>Document does not exist</h4>

  return (
    <Grid>
      <Instance online={isOnline}>
        <Title>
          <H4>Editor: {name}</H4>
          <div style={{ display: 'flex', marginTop: 10, marginBottom: 10 }}>
            <Button type="button" onClick={toggleOnline}>
              Go {isOnline ? 'offline' : 'online'}
            </Button>
          </div>
        </Title>
        <EditorFrame editor={editor} />
      </Instance>
    </Grid>
  )
}

export default Diary

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & CursorEditor
  }
}
