'use client'
import { useState } from 'react'
import { FilePond } from 'react-filepond'

export const UploadFile = () => {
  const [files, setFiles] = useState<any[]>([])

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  return (
    <>
      <div className="w-full pt-3">
        <FilePond
          allowMultiple={false}
          acceptedFileTypes={['image/*']}
          labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
          files={files}
          onupdatefiles={handleUpdateFiles}
          // styleLoadIndicatorPosition="center bottom"
          // styleProgressIndicatorPosition="right bottom"
          // styleButtonRemoveItemPosition="left bottom"
        />
      </div>
    </>
  )
}
