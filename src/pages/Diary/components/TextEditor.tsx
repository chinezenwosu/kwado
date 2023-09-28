import { useEffect, useRef } from 'react'
import { Socket } from 'socket.io-client'
import ReactQuill, { Value } from 'react-quill'
import { modules } from './Toolbar'
import { DeltaStatic } from 'quill'
import styles from './TextEditor.module.css'
import 'react-quill/dist/quill.snow.css'

const socketEmissions = {
  GET_DOCUMENT: 'GET_DOCUMENT',
  LOAD_DOCUMENT: 'LOAD_DOCUMENT',
  SEND_DOCUMENT_CONTENT_CHANGES: 'SEND_DOCUMENT_CONTENT_CHANGES',
  RECEIVE_DOCUMENT_CONTENT_CHANGES: 'RECEIVE_DOCUMENT_CONTENT_CHANGES',
}

type Payload = {
  payload: {
    data: Value,
    delta: DeltaStatic
  }
}

const TextEditor = ({ socket, document }: { socket: Socket, document: DeltaStatic }) => {
  const editorRef = useRef<ReactQuill>(null)

  useEffect(() => {
    const editor = editorRef.current

    if (editor === null) return

    const contentHandler = (data: Payload) => {
      editor.getEditor().updateContents(data.payload.delta)
    }

    socket.on(socketEmissions.RECEIVE_DOCUMENT_CONTENT_CHANGES, contentHandler)

    return () => {
      socket.off(socketEmissions.RECEIVE_DOCUMENT_CONTENT_CHANGES, contentHandler)
    }
  }, [editorRef.current])

  useEffect(() => {
    if (!editorRef.current) return

    const editor = editorRef.current.getEditor()
    editor.setContents(document)
    editor.enable()
    editor.setSelection(editor.getLength(), 0)
  }, [editorRef.current])

  const onChange = (_content: string, delta: DeltaStatic, source: String, editor: ReactQuill.UnprivilegedEditor) => {
    if (source !== 'user') return

    socket.volatile.emit(socketEmissions.SEND_DOCUMENT_CONTENT_CHANGES, {
      payload: {
        delta,
        data: editor.getContents(),
      },
    })
  }

  return (
    <ReactQuill
      ref={editorRef}
      className={styles.editor}
      placeholder="Start typing something..."
      theme="snow"
      readOnly={true}
      value={document}
      onChange={onChange}
      modules={modules}
    />
  )
}

export default TextEditor
