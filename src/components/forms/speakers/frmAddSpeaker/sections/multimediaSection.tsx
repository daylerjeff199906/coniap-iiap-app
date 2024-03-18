'use client'
import { useState } from 'react'
import { FilePond } from 'react-filepond'
import { Controller, useFormContext } from 'react-hook-form'

export const MultimediaSection = () => {
  const [files, setFiles] = useState([])

  const { setValue } = useFormContext()

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
    setValue(
      'image',
      fileItems.map((fileItem: any) => fileItem.file)
    )
  }

  return (
    <section className="space-y-3">
      <h3>Multimedia</h3>
      {/* <Controller
        name="image"
        render={({ field: { onChange, value } }) => (
          <FilePond
            allowMultiple={true}
            acceptedFileTypes={['image/*']}
            labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
            files={value}
            onupdatefiles={handleUpdateFiles}
          />
        )}
      /> */}
      <FilePond
        allowMultiple={true}
        acceptedFileTypes={['image/*']}
        labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
        files={files}
        onupdatefiles={handleUpdateFiles}
      />
    </section>
  )
}
