'use client'
import { FilePond, registerPlugin } from 'react-filepond'
import { useFormContext, Controller } from 'react-hook-form'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import { Link } from '@nextui-org/react'
registerPlugin(FilePondPluginFileValidateType)

export const MultimediaSection = ({ loading }: { loading?: boolean }) => {
  const { control, watch } = useFormContext()

  const id = watch('id')
  const file = watch('file')
  const isFileString = typeof file === 'string'

  return (
    <section className="space-y-3 w-full ">
      <div>
        <h3 className="text-sm">Subir archivo</h3>
        <p className="text-gray-500 text-xs">
          Sube un archivo en formato PDF o Word para adjuntar al resumen. Máximo
          2 hojas.
        </p>
        <p className="text-xs font-bold">
          Te sugerimos que el nombre del archivo sea el mismo que el título del
          resumen y que lleve tu primer apellido y tu nombre (Ejemplo: Título
          del resumen_Apellido_Nombre.pdf).
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
          rules={{
            required: 'Este campo es requerido',
          }}
          render={({ field: { onChange } }) => (
            <FilePond
              allowMultiple={false}
              disabled={loading}
              instantUpload={false}
              acceptedFileTypes={[
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ]}
              required={id ? false : true}
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
        {isFileString && (
          <div>
            <p className="text-sm font-medium">
              Si sube un resumen reemplazará el actual.
            </p>
            <Link
              href={watch('file')}
              target="_blank"
              showAnchorIcon
              size="sm"
            >
              Ver resumen actual
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
