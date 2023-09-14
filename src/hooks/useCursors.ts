// @ts-nocheck
// copied from /node_modules/slate-yjs/dist/module/plugin/useCursors.js
// to fix issue with infinite rerendering caused by setting newCursorData
import { useCallback, useEffect, useState, useRef } from 'react'
import { Path, Range, Text } from 'slate'
import invariant from 'tiny-invariant'
import * as Y from 'yjs'
import { Cursor } from 'slate-yjs/dist/main/model'

const getArrayPosition = (item) => {
  let i = 0
  let c = item.parent._start

  while (c !== item && c !== null) {
    if (!c.deleted) {
      i += 1
    }

    c = c.right
  }
  return i
}

const getSyncNodePath = (node) => {
  if (!node) {
    return []
  }

  const { parent } = node

  if (!parent) {
    return []
  }

  if (parent instanceof Y.Array) {
    invariant(node._item, 'Parent should be associated with a item')
    return [...getSyncNodePath(parent), getArrayPosition(node._item)]
  }

  if (parent instanceof Y.Map) {
    return getSyncNodePath(parent)
  }

  throw new Error(`Unknown parent type ${parent}`)
}

const relativePositionToAbsolutePosition = (sharedType, relativePosition) => {
  invariant(sharedType.doc, 'Shared type should be bound to a document')

  const pos = Y.createAbsolutePositionFromRelativePosition(relativePosition, sharedType.doc)

  if (!pos) {
    return null
  }

  return {
    path: getSyncNodePath(pos.type.parent),
    offset: pos.index,
  }
}

const useCursors = (editor) => {
  const [cursors, _setCursorData] = useState<Array<Cursor>>([])
  const cursorsRef = useRef(cursors)

  const setCursorData = (data: []) => {
    cursorsRef.current = data
    _setCursorData(data)
  }

  useEffect(() => {
    editor.awareness.on('update', () => {
      const newCursorData = Array.from(editor.awareness.getStates())
        .filter(([clientId]) => { var _a; return clientId !== ((_a = editor.sharedType.doc) === null || _a === void 0 ? void 0 : _a.clientID) })
        .map(([, awareness]) => {
          let anchor = null
          let focus = null

          if (awareness.anchor) {
            anchor = relativePositionToAbsolutePosition(editor.sharedType, awareness.anchor)
          }

          if (awareness.focus) {
            focus = relativePositionToAbsolutePosition(editor.sharedType, awareness.focus)
          }

          return { anchor, focus, data: awareness }
        })
        .filter((cursor: any) => cursor.anchor && cursor.focus)

      if (JSON.stringify(cursorsRef.current) !== JSON.stringify(newCursorData)) {
        setCursorData(newCursorData)
      }
    })
  }, [editor])

  const decorate = useCallback(([node, path]) => {
    const ranges = []

    if (Text.isText(node) && (cursors === null || cursors === void 0 ? void 0 : cursors.length)) {
      cursors.forEach((cursor) => {
        if (Range.includes(cursor, path)) {
          const { focus, anchor, data } = cursor
          const isFocusNode = Path.equals(focus.path, path)
          const isAnchorNode = Path.equals(anchor.path, path)
          const isForward = Range.isForward({ anchor, focus })

          ranges.push({
            data,
            isForward,
            isCaret: isFocusNode,
            anchor: {
              path,
              offset: isAnchorNode
                ? anchor.offset
                : isForward
                  ? 0
                  : node.text.length,
            },
            focus: {
              path,
              offset: isFocusNode
                ? focus.offset
                : isForward
                  ? node.text.length
                  : 0,
            },
          })
        }
      })
    }
    
    return ranges
  }, [cursors])

  return { decorate, cursors }
}

export default useCursors