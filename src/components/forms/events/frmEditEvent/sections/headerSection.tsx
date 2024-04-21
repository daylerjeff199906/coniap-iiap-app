'use client'
import { useState } from 'react'
import { Image } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'

// Import React FilePond
import { FilePond } from 'react-filepond'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

import { useEvents, useFiles } from '@/hooks/admin'

export const HeaderSection = () => {
  const { watch, setValue } = useFormContext()
  const { uploadImage } = useEvents()
  const { editField } = useFiles()

  const searchParams = useSearchParams()
  const id = searchParams.get('edit') as string

  const [files, setFiles] = useState([])

  const handleUpdateFiles = (fileItems: any) => {
    // Set current file objects to this.state
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  return (
    <>
      <FilePond
        allowMultiple={false}
        acceptedFileTypes={['image/*']}
        labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
        server={{
          process: async (
            fieldName,
            file,
            metadata,
            load,
            error,
            progress,
            abort
          ) => {
            try {
              const data = file as File
              const url = await uploadImage(data)
              if (url !== '') {
                await editField(id, 'events', 'banner', url)
                setValue('banner', url)
              }
              load(url)
            } catch (error) {
              console.error('Upload error', error)
            }
          },
        }}
        files={files}
        onupdatefiles={handleUpdateFiles}
        instantUpload={false}
      />
      <label className="text-sm font-semibold ">
        Imagen de portada para el evento
      </label>
    </>
  )
}
