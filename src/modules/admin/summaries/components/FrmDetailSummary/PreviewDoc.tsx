'use client'
import { ISummary } from '@/types'
import { useFormContext } from 'react-hook-form'
import { getFileType } from '../../functions'

export const PreviewDoc = () => {
  const { watch } = useFormContext<ISummary>()
  const value = watch('file')

  const fileType = getFileType(value)

  return (
    <section className="w-full h-full">
      {value && fileType === 'pdf' && (
        <iframe
          src={value}
          width="100%"
          className="h-screen max-h-[calc(100vh-11rem)]"
          title="PDF file"
        ></iframe>
      )}
      {value && fileType === 'word' && (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
            value
          )}`}
          width="100%"
          className="h-screen max-h-[calc(100vh-11rem)]"
          title="Word file"
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
