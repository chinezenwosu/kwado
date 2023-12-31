import {
  Ref,
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import Quill, { DeltaStatic } from 'quill'
import randomColor from 'randomcolor'
import QuillCursors from 'quill-cursors'
import ReactQuill, { Range } from 'react-quill'
import socketConnection, { EditorSocket } from '../lib/socketConnection'
import { debounceLeading, formatString } from '../utils'
import { AuthContext } from '../context/AuthContext'

Quill.register('modules/cursors', QuillCursors)

type ComponentProps = {
  socket: EditorSocket
}

type EditorProps = {
  modules: { [key: string]: any }
  className: string
  placeholder: string
  theme: string
  readOnly: boolean
  value: DeltaStatic
  onChange: (
    _content: string,
    delta: DeltaStatic,
    source: string,
    editor: ReactQuill.UnprivilegedEditor
  ) => void
}

type EditorSelectionProps = {
  clientId: string
  payload: { data: unknown }
}

const withCursors =
  (Component: typeof ReactQuill) => (otherProps: ComponentProps) => {
    const Editor = (props: EditorProps, forwardedRef: Ref<ReactQuill>) => {
      const { user } = useContext(AuthContext)
      const name = formatString.getUserFullName(user)
      const color = useMemo(
        () =>
          randomColor({
            luminosity: 'dark',
            format: 'rgba',
            alpha: 1,
          }),
        [],
      )

      const ref = useRef<ReactQuill>(null)
      useImperativeHandle(forwardedRef, () => ref.current as ReactQuill)

      const onChangeSelection = debounceLeading(
        (range: Range, source: string) => {
          if (source !== 'user') return

          otherProps.socket.volatile.emit(
            socketConnection.editorEmissions.SEND_DOCUMENT_SELECTION,
            {
              payload: {
                data: range,
              },
            },
          )
        },
        1000,
      )

      const initializeCursor = (editor: Quill) => {
        editor.setSelection(editor.getLength(), 0)
        otherProps.socket.volatile.emit(
          socketConnection.editorEmissions.SEND_DOCUMENT_SELECTION,
          {
            payload: {
              data: editor.getSelection(),
            },
          },
        )
      }

      useEffect(() => {
        const quill = ref.current

        if (quill === null) return

        const editor = quill.getEditor()
        initializeCursor(editor)

        const selectionHandler = (data: EditorSelectionProps) => {
          const cursor = editor.getModule('cursors')

          cursor.createCursor(data.clientId, name, color)
          cursor.moveCursor(data.clientId, data.payload.data)
        }

        otherProps.socket.on(
          socketConnection.editorEmissions.RECEIVE_DOCUMENT_SELECTION,
          selectionHandler,
        )

        const connectionHandler = (clientId: string) => {
          const cursor = editor.getModule('cursors')
          cursor.removeCursor(clientId)
        }

        otherProps.socket.on(
          socketConnection.editorEmissions.CLIENT_DISCONNECTED,
          connectionHandler,
        )

        return () => {
          otherProps.socket.off(
            socketConnection.editorEmissions.RECEIVE_DOCUMENT_SELECTION,
            selectionHandler,
          )
          otherProps.socket.off(
            socketConnection.editorEmissions.CLIENT_DISCONNECTED,
            connectionHandler,
          )
        }
      }, [ref.current])

      const modifiedProps = {
        ...props,
        ...{
          modules: {
            ...props.modules,
            ...{
              cursors: {
                transformOnTextChange: true,
              },
            },
          },
        },
      }

      return (
        <Component
          {...modifiedProps}
          ref={ref}
          onChangeSelection={onChangeSelection}
        />
      )
    }

    return forwardRef(Editor)
  }

export default withCursors
