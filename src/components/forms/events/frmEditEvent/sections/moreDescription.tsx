/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useFormContext } from 'react-hook-form'

import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css' // Add css for snow theme
import { useEffect } from 'react'

export const MoreDescription = ({
  defaultContent,
}: {
  defaultContent: string
}) => {
  const { setValue } = useFormContext()
  const { quill, quillRef } = useQuill()

  const handleDescriptionChange = (content: string) => {
    // Manejar cambios en la descripción aquí
    setValue('customContent', content)
  }

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        handleDescriptionChange(quill.root.innerHTML)
      })
    }
  }, [quill])

  useEffect(() => {
    if (defaultContent) {
      quill.clipboard.dangerouslyPasteHTML(defaultContent)
    }
  }, [defaultContent])

  return (
    <section className="grid grid-cols-1 gap-4">
      <div
        style={{ height: '260px' }}
        ref={quillRef}
      />
    </section>
  )
}
