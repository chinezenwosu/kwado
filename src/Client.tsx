import { useState, useEffect, useMemo } from 'react'
import randomColor from 'randomcolor'
import { createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { ReactEditor, withReact } from 'slate-react'
import { withIOCollaboration, useCursor } from '@slate-collaborative/client'
import { useParams } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import EditorFrame from './EditorFrame'
import { withLinks } from './plugins/link'
import {
  Grid,
  Instance,
  Title,
  Button,
  H4,
} from './Components'
import { WithSocketIOEditor } from '@slate-collaborative/client/lib/withSocketIO'
import { AutomergeEditor } from '@slate-collaborative/client/lib/automerge-editor'

interface IUser {
  id: string
  name: string
}

const createUser = (): IUser => ({
  id: faker.string.uuid(),
  name: `${faker.person.firstName()} ${faker.person.lastName()}`
})

const user = createUser()

const Client = () => {
  const [isOnline, setOnlineState] = useState<boolean>(false)
  const params = useParams()
  const { id, name } = user

  const color = useMemo(
    () =>
      randomColor({
        luminosity: 'dark',
        format: 'rgba',
        alpha: 1
      }),
    []
  )

  const editor = useMemo(() => {
    const slateEditor = withLinks(withReact(withHistory(createEditor())))
    const slug = params.slug || ''

    const origin =
      process.env.NODE_ENV === 'production'
        ? window.location.origin
        : 'http://localhost:8000'

    const options = {
      docId: `/${slug}`,
      cursorData: {
        name,
        color,
        alphaColor: color.slice(0, -2) + '0.2)'
      },
      url: `${origin}/${slug}`,
      connectOpts: {
        query: {
          name,
          token: id,
          slug
        }
      },
      onConnect: () => setOnlineState(true),
      onDisconnect: () => setOnlineState(false)
    }

    return withIOCollaboration(slateEditor, options)
  }, [])

  useEffect(() => {
    editor.connect()

    return editor.destroy
  }, [])

  const { decorate } = useCursor(editor)

  const toggleOnline = () => {
    const { connect, disconnect } = editor
    isOnline ? disconnect() : connect()
  }

  if (!isOnline) return <h4>Document does not exist</h4>

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
        <EditorFrame
          editor={editor}
          decorate={decorate}
        />
      </Instance>
    </Grid>
  )
}

export default Client

declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor & WithSocketIOEditor & AutomergeEditor
  }
}
