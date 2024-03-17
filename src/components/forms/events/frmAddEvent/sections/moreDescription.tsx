'use client'
import { useFormContext } from 'react-hook-form'

import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css' // Add css for snow theme

export const MoreDescription = () => {
  const { setValue } = useFormContext()

  const handleDescriptionChange = (content: string) => {
    // Manejar cambios en la descripción aquí
    setValue('customContent', content)
  }
  const { quillRef } = useQuill({
    onchange: handleDescriptionChange,
  })

  return (
    <section className="grid grid-cols-1 gap-4">
      <h1 className="text-lg">Personalizar contenido</h1>
      {/* {useQuill({ onChange: handleDescriptionChange })} */}
      <div
        style={{ height: '260px' }}
        ref={quillRef}
      />
    </section>
  )
}
