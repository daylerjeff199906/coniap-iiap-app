// useQuill.tsx
'use client'
import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

interface UseQuillProps {
  value?: string
  onChange?: (content: string) => void
}

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['link'],
  ['clean'],
]

const useQuill = ({ value, onChange }: UseQuillProps) => {
  const quillRef = useRef<Quill | null>(null)
  const quillContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!quillRef.current && quillContainer.current) {
      const editor = new Quill(quillContainer.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions,
        },
      })

      quillRef.current = editor

      editor.on('text-change', () => {
        if (onChange) {
          onChange(editor.root.innerHTML)
        }
      })
    }

    if (quillRef.current && value !== undefined) {
      quillRef.current.root.innerHTML = value
    }
  }, [value, onChange])

  return (
    <div
      style={{ height: '260px' }}
      ref={quillContainer}
    />
  )
}

export default useQuill
