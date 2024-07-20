'use client'
import { Controller, useFormContext } from 'react-hook-form'
import dynamic from 'next/dynamic'

//For the text field
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
import { IEvent } from '@/types'

export const MoreDescription = () => {
  const { control } = useFormContext<IEvent>()

  return (
    <section className="grid grid-cols-1 gap-4">
      <div className=" h-72 section-admin">
        <h1 className="text-gray-400">Personalizar contenido</h1>
        <Controller
          control={control}
          name="customContent"
          render={({ field: { value, onChange } }) => (
            <ReactQuill
              value={value}
              onChange={onChange}
              theme="snow"
              className="max-h-52 w-full h-48"
            />
          )}
        />
      </div>
    </section>
  )
}
