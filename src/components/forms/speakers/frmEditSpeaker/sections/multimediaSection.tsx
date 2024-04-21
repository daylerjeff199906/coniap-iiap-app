/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { Image } from '@nextui-org/react'
import { useFormContext } from 'react-hook-form'
import { useFiles } from '@/hooks/admin'

import { FilePond } from 'react-filepond'

export const MultimediasSection = () => {
  const { watch, setValue } = useFormContext()
  const { uploadImage, editField, deleteImage } = useFiles()

  const [files, setFiles] = useState([] as any)

  const urlImage = watch('image')
  const id = watch('id')

  const handleUpdateFiles = (fileItems: any) => {
    // Set current file objects to this.state
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  useEffect(() => {
    const urlImage = watch('image')
    if (urlImage) {
      setFiles([
        {
          source: urlImage,
          options: {
            type: 'local',
          },
        },
      ])
    } else {
      setFiles([])
    }
  }, [watch('image')])

  return (
    <>
      <section className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-center w-full">
          <Image
            src={urlImage || 'https://via.placeholder.com/150'}
            alt="Speaker image"
            className="w-40 h-40 rounded-full object-cover"
            removeWrapper
          />
        </div>
        <div className="w-44 h-44">
          <FilePond
            allowMultiple={false}
            acceptedFileTypes={['image/*']}
            labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
            imagePreviewHeight={170}
            stylePanelLayout={'compact circle'}
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
                  const url = await uploadImage('speakers', data)
                  if (url !== '') {
                    await editField(id, 'speakers', 'banner', url)
                    setValue('image', url)
                  }
                  load(url)
                } catch (error) {
                  console.error('Upload error', error)
                }
              },
              remove: async (source, load, error) => {
                try {
                  await deleteImage(source)
                  setValue('image', '')
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
      </section>
    </>
  )
}
