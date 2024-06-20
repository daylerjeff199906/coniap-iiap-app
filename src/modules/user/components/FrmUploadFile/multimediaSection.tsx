'use client'
import { FilePond, registerPlugin } from 'react-filepond'
import { useFormContext, Controller } from 'react-hook-form'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
registerPlugin(FilePondPluginFileValidateType)

export const MultimediaSection = ({ loading }: { loading?: boolean }) => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext()

  const file = watch('file')

  return (
    <section className="space-y-3 w-full ">
      <h3 className="text-sm">Subir archivo</h3>
      <div>
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
              acceptedFileTypes={['application/pdf', 'application/msword']}
              required
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
      </div>
    </section>
  )
}
