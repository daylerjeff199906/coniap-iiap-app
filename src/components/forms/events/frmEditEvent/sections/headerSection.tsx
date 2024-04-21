/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSearchParams } from 'next/navigation'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import 'filepond/dist/filepond.min.css'

registerPlugin(FilePondPluginImagePreview)

import { useFiles } from '@/hooks/admin'

export const HeaderSection = () => {
  const { watch, setValue } = useFormContext()
  const { editField, uploadImage, deleteImage } = useFiles()

  const searchParams = useSearchParams()
  const id = searchParams.get('edit') as string

  const [files, setFiles] = useState([] as any)

  const handleUpdateFiles = (fileItems: any) => {
    // Set current file objects to this.state
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  useEffect(() => {
    const banner = watch('banner')
    if (banner) {
      setFiles([
        {
          source: banner,
          options: {
            type: 'local',
          },
        },
      ])
    } else {
      setFiles([])
    }
  }, [watch('banner')])

  return (
    <>
      <div>
        <label className="text-sm font-semibold ">
          Imagen de portada para el evento
        </label>
        <div className="pt-4">
          <FilePond
            allowMultiple={false}
            acceptedFileTypes={['image/png, image/jpeg, image/gif']}
            labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
            imagePreviewHeight={170}
            styleLoadIndicatorPosition="center bottom"
            styleProgressIndicatorPosition="right bottom"
            styleButtonRemoveItemPosition="left bottom"
            styleButtonProcessItemPosition="right bottom"
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
                  const url = await uploadImage('events', data)
                  if (url !== '') {
                    await editField(id, 'events', 'banner', url)
                    setValue('banner', url)
                  }
                  load(url)
                } catch (error) {
                  console.error('Upload error', error)
                }
              },
              remove: async (source, load, error) => {
                try {
                  await deleteImage(source)
                  await editField(id, 'events', 'banner', '')
                  setValue('banner', '')
                  load()
                } catch (error) {
                  console.error('Remove error', error)
                }
              },
            }}
            files={files}
            onupdatefiles={handleUpdateFiles}
            instantUpload={false}
          />
        </div>
      </div>
    </>
  )
}
