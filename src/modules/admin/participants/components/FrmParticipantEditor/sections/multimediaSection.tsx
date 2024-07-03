'use client'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

registerPlugin(FilePondPluginImagePreview)
registerPlugin(FilePondPluginFileValidateType)
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
    <section className="space-y-3 w-full flex flex-col items-center">
      <h3 className="w-full text-start text-sm font-medium">
        Imagen de perfil
      </h3>
      <div className="w-44 h-44">
        <FilePond
          allowMultiple={false}
          acceptedFileTypes={['image/*']}
          files={files}
          onupdatefiles={handleUpdateFiles}
          stylePanelLayout={'compact circle'}
          styleLoadIndicatorPosition="center bottom"
          styleProgressIndicatorPosition="right bottom"
          styleButtonRemoveItemPosition="left bottom"
          labelIdle='Arrastra y suelta tu archivo o <span class="filepond--label-action"> busca </span>'
          imagePreviewHeight={100}
          styleButtonProcessItemPosition="right bottom"
        />
      </div>
    </section>
  )
}
