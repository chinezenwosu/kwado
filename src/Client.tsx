import { useState, useEffect, useMemo } from 'react'
import styled from '@emotion/styled'
import randomColor from 'randomcolor'
import { createEditor, BaseEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import { withIOCollaboration, useCursor } from '@slate-collaborative/client'
import { WithSocketIOEditor } from '@slate-collaborative/client/lib/withSocketIO'
import { AutomergeEditor } from '@slate-collaborative/client/lib/automerge-editor'
import { useParams } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import { Instance, Title, H4, Button, Grid } from './Components'
import EditorFrame from './EditorFrame'
import { withLinks } from './plugins/link'

const Client = () => {
  const [isOnline, setOnlineState] = useState<boolean>(false)
  const params = useParams()
  const slug = params.id || ''
  const id = faker.string.uuid()
  const name = `${faker.person.firstName()} ${faker.person.lastName()}`

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

    const origin =
      process.env.NODE_ENV === 'production'
        ? window.location.origin
        : 'http://localhost:8000'

    const options = {
      docId: '/' + slug,
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

  if (editor.children.length === 0) return <h4>Document does not exist</h4>

  return (
    <Grid>
      <Instance online={isOnline}>
        <Title>
          <Head>Editor: {name}</Head>
          <div style={{ display: 'flex', marginTop: 10, marginBottom: 10 }}>
            <Button type="button" onClick={toggleOnline}>
              Go {isOnline ? 'offline' : 'online'}
            </Button>
          </div>
        </Title>

        <EditorFrame
          editor={editor}
          decorate={decorate}
          defaultValue={editor.children}
        />
      </Instance>
    </Grid>
  )
}

export default Client

const Head = styled(H4)`
  margin-right: auto;
`

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & WithSocketIOEditor & AutomergeEditor
  }
}
