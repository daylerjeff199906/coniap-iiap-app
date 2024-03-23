import { useForm, Controller, FormProvider } from 'react-hook-form'
import { ISpeaker } from '@/types'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { use, useState } from 'react'
import { FilePond } from 'react-filepond'

export const FrmInscriptions = () => {
  const [showFile, setShowFile] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const methods = useForm<ISpeaker>()

  const dateLimit = '2024-10-01'
  const inDate = new Date() < new Date(dateLimit)

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  const onSubmit = () => {
    console.log('Submit')
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-full max-w-xl sm:grid flex flex-col sm:grid-cols-2 gap-4 sm:p-4 sm:shadow-lg sm:rounded-lg"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="col-span-2">
            <h1 className="text-xl font-bold">Formulario de inscripción</h1>
            <p className="text-sm text-gray-500">
              Ingresa tus datos para inscribirte en el evento, puedes participar
              como asistente o expositor.
            </p>
          </div>
          <Controller
            control={methods.control}
            name="fullName"
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Nombres"
                labelPlacement="outside"
                radius="sm"
                placeholder="Nombres"
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.fullName !== undefined}
                errorMessage={methods.formState.errors.fullName?.message}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="surName"
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Apellidos"
                labelPlacement="outside"
                radius="sm"
                placeholder="Apellidos"
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.surName !== undefined}
                errorMessage={methods.formState.errors.surName?.message}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="job"
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Formación/Profesión"
                labelPlacement="outside"
                radius="sm"
                placeholder="Biólogo, Ingeniero, etc."
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.job !== undefined}
                errorMessage={methods.formState.errors.job?.message}
              />
            )}
          />
          <Controller
            control={methods.control}
            name="institution"
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Institución"
                labelPlacement="outside"
                radius="sm"
                placeholder="Escriba el nombre de la institución"
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.institution !== undefined}
                errorMessage={methods.formState.errors.institution?.message}
              />
            )}
          />
          <div className="col-span-1 sm:col-span-2">
            <Controller
              control={methods.control}
              name="location"
              rules={{ required: 'Este campo es requerido' }}
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Localidad/Procedencia"
                  labelPlacement="outside"
                  radius="sm"
                  placeholder="País, Ciudad"
                  value={value}
                  onValueChange={onChange}
                  isInvalid={methods.formState.errors.location !== undefined}
                  errorMessage={methods.formState.errors.location?.message}
                />
              )}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <Controller
              control={methods.control}
              name="email"
              rules={{
                required: 'Este campo es requerido',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Email no válido',
                },
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  label="Email"
                  labelPlacement="outside"
                  radius="sm"
                  placeholder="ejemplo@hotmail.com"
                  value={value}
                  onValueChange={onChange}
                  isInvalid={methods.formState.errors.email !== undefined}
                  errorMessage={methods.formState.errors.email?.message}
                />
              )}
            />
          </div>
          {inDate && (
            <>
              <Checkbox
                isSelected={showFile}
                onValueChange={() => setShowFile(!showFile)}
              >
                Añadir resumen
              </Checkbox>
              <div className="col-span-1 sm:col-span-2">
                <FilePond
                  allowMultiple={false}
                  acceptedFileTypes={['pdf/*']}
                  files={files}
                  onupdatefiles={handleUpdateFiles}
                  labelIdle='Arrastra y suelta tu imagen o <span class="filepond--label-action"> busca </span>'
                  disabled={!showFile}
                />
              </div>
            </>
          )}
          <Checkbox
            className="col-span-2"
            size="sm"
          >
            Acepto los términos y condiciones
          </Checkbox>
          <div className="col-span-2 flex justify-end">
            <Button
              radius="sm"
              color="primary"
              type="submit"
            >
              Enviar
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  )
}
