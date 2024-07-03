'use client'
import { ISummary } from '@/types'
import { useFormContext } from 'react-hook-form'

export const PreviewDoc = () => {
  const { watch } = useFormContext<ISummary>()
  const value = watch('file')
  const file = value ? value[0] : null

  const isString = typeof file === 'string'

  console.log('value', value)
  console.log('isString', isString)
  console.log('file', file)

  const src = isString ? value : file ? URL.createObjectURL(file) : ''

  return (
    <section className="w-full h-full">
      {file && (
        <iframe
          src={src}
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
