'use client'
import { ISummary } from '@/types'
import { useFormContext } from 'react-hook-form'

// const getFileType = (fileUrl: string) => {
//   const extension = fileUrl.split('.').pop()?.toLowerCase()
//   if (extension === 'pdf') return 'pdf'
//   if (extension === 'doc' || extension === 'docx') return 'word'
//   return 'unknown'
// }

const cleanUrl = (fileUrl: string) => fileUrl.split('?')[0]

const getFileType = (fileUrl: string) => {
  const cleanedUrl = cleanUrl(fileUrl)
  // console.log('cleanedUrl', cleanedUrl)
  const extension = cleanedUrl.split('.').pop()?.toLowerCase()
  // console.log('extension', extension)
  if (extension === 'pdf') {
    const nameWithoutExt = cleanedUrl.substring(0, cleanedUrl.lastIndexOf('.'))
    const originalExtension = nameWithoutExt.split('.').pop()?.toLowerCase()
    if (originalExtension === 'doc' || originalExtension === 'docx') {
      return 'word'
    }
    return 'pdf'
  }
  return 'unknown'
}

export const PreviewDoc = () => {
  const { watch } = useFormContext<ISummary>()
  const value = watch('file')

  const fileType = getFileType(value)

  // console.log('fileType', fileType)

  return (
    <section className="w-full h-full">
      {value}
      <div>
        Tipo de archivo: {fileType}
      </div>
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
