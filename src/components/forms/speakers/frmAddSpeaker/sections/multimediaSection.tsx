'use client'
// import { useState } from 'react'
import { FilePond } from 'react-filepond'
// import { useFormContext } from 'react-hook-form'

interface IProps {
  files: any[]
  setFiles: (files: any) => void
}

export const MultimediaSection = (props: IProps) => {
  const { files, setFiles } = props

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  return (
    <section className="space-y-3 w-full ">
      <h3>Imagen de perfil</h3>
      <div className="w-44 h-44">
        <FilePond
          allowMultiple={false}
          acceptedFileTypes={['image/*']}
          labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
          files={files}
          onupdatefiles={handleUpdateFiles}
          stylePanelLayout={'compact circle'}
          styleLoadIndicatorPosition="center bottom"
          styleProgressIndicatorPosition="right bottom"
          styleButtonRemoveItemPosition="left bottom"
        />
      </div>
    </section>
  )
}
