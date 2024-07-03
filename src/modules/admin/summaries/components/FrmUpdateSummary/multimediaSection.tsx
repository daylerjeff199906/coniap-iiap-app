'use client'
import { FilePond, registerPlugin } from 'react-filepond'
import { useFormContext, Controller } from 'react-hook-form'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'

import { ISummary } from '@/types'
registerPlugin(FilePondPluginFileValidateType)

export const MultimediaSection = ({ loading }: { loading?: boolean }) => {
  const { control, watch } = useFormContext<ISummary>()

  return (
    <section className="space-y-3 w-full ">
      <div>
        <h3 className="text-sm">Subir archivo</h3>
        <p className="text-gray-500 text-xs">
          Sube un archivo en formato PDF o Word para adjuntar al resumen. Máximo
          2 hojas.
        </p>
      </div>
      <div>
        <Controller
          name="file"
          control={control}
          render={({ field: { onChange } }) => (
            <FilePond
              allowMultiple={false}
              disabled={loading}
              instantUpload={false}
              acceptedFileTypes={['application/pdf', 'application/msword']}
              server={{
                process: (
                  fieldName: any,
                  file: any,
                  metadata: any,
                  load: any,
                  error: any,
                  progress: any,
                  abort: any
                ) => {
                  onChange(file)
                },
              }}
              onupdatefiles={(fileItems) => {
                if (fileItems) {
                  onChange(fileItems.map((fileItem: any) => fileItem.file))
                }
              }}
            />
          )}
        />
        {watch('file') && (
          <p className="text-sm font-medium">
            Si sube un resumen reemplazará el actual.
          </p>
        )}
      </div>
    </section>
  )
}
