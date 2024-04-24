/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css' // Add css for snow theme

export const MoreDescription = () => {
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

  return (
    <section className="grid grid-cols-1 gap-4">
      <h1 className="text-gray-400">Personalizar contenido</h1>
      {/* {useQuill({ onChange: handleDescriptionChange })} */}
      <div
        style={{ height: '260px' }}
        ref={quillRef}
      />
    </section>
  )
}
