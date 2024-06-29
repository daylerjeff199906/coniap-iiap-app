'use client'
import { ISummary } from '@/types'
import { useFormContext } from 'react-hook-form'

export const PreviewDoc = () => {
  const { watch } = useFormContext<ISummary>()
  const value = watch('file')
  const file = value ? value[0] : null

  return (
    <section className="w-full h-full">
      {file && (
        <iframe
          src={URL.createObjectURL(file as unknown as Blob)}
          width="100%"
          className="h-screen max-h-[calc(100vh-11rem)]"
          title="file"
        ></iframe>
      )}
      {!file && (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500">No hay archivo seleccionado</p>
        </div>
      )}
    </section>
  )
}