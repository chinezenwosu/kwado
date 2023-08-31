import { useState, useEffect, useMemo } from 'react'
import randomColor from 'randomcolor'
import { createEditor, BaseEditor } from 'slate'
import { withHistory } from 'slate-history'
import { withReact } from 'slate-react'
import { withIOCollaboration, useCursor } from '@slate-collaborative/client'
import { WithSocketIOEditor } from '@slate-collaborative/client/lib/withSocketIO'
import { AutomergeEditor } from '@slate-collaborative/client/lib/automerge-editor'
import { useParams } from 'react-router-dom'
import { faker } from '@faker-js/faker'
import EditorFrame from './EditorFrame'
import { withLinks } from './plugins/link'

const Client = () => {
  const [isOnline, setOnlineState] = useState<boolean>(false)
  const params = useParams()
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
    const slug = params.slug || ''
    const id = faker.string.uuid()

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

  return (
    <EditorFrame
      editor={editor}
      decorate={decorate}
      defaultValue={editor.children}
      name={name}
      isOnline={isOnline}
    />
  )
}

export default Client

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & WithSocketIOEditor & AutomergeEditor
  }
}
