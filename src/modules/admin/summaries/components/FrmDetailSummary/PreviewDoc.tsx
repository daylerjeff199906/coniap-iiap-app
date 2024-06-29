'use client'
import { ISummary } from '@/types'
import { useFormContext } from 'react-hook-form'

export const PreviewDoc = () => {
  const { watch } = useFormContext<ISummary>()
  const value = watch('file')

  return (
    <section className="w-full h-full">
      {value && (
        <iframe
          src={value}
          width="100%"
          className="h-screen max-h-[calc(100vh-11rem)]"
          title="file"
        ></iframe>
      )}
      {!value && (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500">No hay documento para mostrar</p>
        </div>
      )}
    </section>
  )
}
