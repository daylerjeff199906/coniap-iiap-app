'use client'
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
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
