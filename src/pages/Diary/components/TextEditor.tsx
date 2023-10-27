import React, { useEffect, useRef } from 'react'
import ReactQuill from 'react-quill'
import Quill, { DeltaStatic } from 'quill'
import { toolbarModules } from './Toolbar'
import withCursors from '../../../hoc/withCursors'
import socketConnection, { EditorSocket } from '../../../lib/socketConnection'
import styles from './TextEditor.module.css'
import 'react-quill/dist/quill.snow.css'

export const defaultEditorValue = {}

const TextEditor = ({
  socket,
  document,
}: {
  socket: EditorSocket
  document: DeltaStatic
}) => {
  const editorRef = useRef<ReactQuill>(null)

  const initializeSelection = (editor: Quill) => {
    if (!editor.getSelection()) {
      editor.setSelection(editor.getLength(), 0)
    }
  }

  useEffect(() => {
    const quill = editorRef.current

    if (quill === null) return

    const editor = quill.getEditor()
    initializeSelection(editor)

    const contentHandler = (delta: DeltaStatic) => {
      editor.updateContents(delta)
    }

    socket.on(
      socketConnection.editorEmissions.RECEIVE_DOCUMENT_CONTENT_CHANGES,
      contentHandler,
    )

    return () => {
      socket.off(
        socketConnection.editorEmissions.RECEIVE_DOCUMENT_CONTENT_CHANGES,
        contentHandler,
      )
    }
  }, [editorRef.current])

  useEffect(() => {
    if (!editorRef.current) return

    const editor = editorRef.current.getEditor()
    editor.setContents(document)
    editor.enable()
    editor.setSelection(editor.getLength(), 0)
  }, [editorRef.current])

  const onChange = (
    _content: string,
    delta: DeltaStatic,
    source: string,
    editor: ReactQuill.UnprivilegedEditor,
  ) => {
    if (source !== 'user') return

    socket.volatile.emit(
      socketConnection.editorEmissions.SEND_DOCUMENT_CONTENT_CHANGES,
      {
        payload: {
          delta,
          data: editor.getContents(),
        },
      },
    )
  }

  const modules = {
    toolbar: toolbarModules,
  }

  const Editor = withCursors(ReactQuill)({ socket })

  return (
    <Editor
      ref={editorRef}
      className={styles.editor}
      placeholder="Start typing something..."
      theme="snow"
      readOnly={document === null}
      value={document}
      onChange={onChange}
      modules={modules}
    />
  )
}

export default TextEditor
