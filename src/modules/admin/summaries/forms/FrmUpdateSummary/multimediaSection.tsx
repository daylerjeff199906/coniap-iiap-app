'use client'
import { FilePond } from 'react-filepond'
import { useFormContext, Controller } from 'react-hook-form'

export const MultimediaSection = () => {
  const { control } = useFormContext()

  return (
    <section className="space-y-3 w-full ">
      <h3 className="text-sm">Subir archivo</h3>
      <div>
        <Controller
          name="file"
          control={control}
          render={({ field: { onChange } }) => (
            <FilePond
              // files={value}
              allowMultiple={false}
              // onupdatefiles={onChange}
              instantUpload={false}
              acceptedFileTypes={['apllication/pdf']}
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
