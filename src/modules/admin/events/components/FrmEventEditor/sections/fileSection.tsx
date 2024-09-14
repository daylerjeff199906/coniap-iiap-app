'use client'
import { FilePond, registerPlugin } from 'react-filepond'
import { useFormContext, Controller } from 'react-hook-form'
import { IEvent } from '@/types'

import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'

registerPlugin(FilePondPluginFileValidateType)

export const FileSection = () => {
  const { control, watch } = useFormContext<IEvent>()

  return (
    <section className="space-y-3 w-full section-admin">
      <div>
        <h3 className="text-sm">Subir banner</h3>
        <p className="text-gray-500 text-xs">
          Sube una imagen para el banner, que no sea mayora a 4 MB
        </p>
      </div>
      <div>
        <style
          jsx
          global
        >{`
          .filepond--action-process-item {
            display: none !important;
          }
        `}</style>
        <Controller
          name="file"
          control={control}
          render={({ field: { onChange } }) => (
            <FilePond
              allowMultiple={false}
              //   disabled={loading}
              instantUpload={false}
              acceptedFileTypes={['webp', 'svg', 'png', 'jpg', 'jpeg']}
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
