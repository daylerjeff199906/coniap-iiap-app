import { useState } from 'react'
import { FilePond } from 'react-filepond'

export const UpLoadImageRounded = () => {
  const [files, setFiles] = useState([])

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  return (
    <>
      <FilePond
        allowMultiple={false}
        acceptedFileTypes={['image/*']}
        files={files}
        onupdatefiles={handleUpdateFiles}
        labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
      />
    </>
  )
}
