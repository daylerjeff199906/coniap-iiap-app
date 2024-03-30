'use client'
import {
  useForm,
  Controller,
  FormProvider,
  SubmitHandler,
} from 'react-hook-form'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { useState } from 'react'
import { FilePond } from 'react-filepond'
import { ModalAction } from '@/components'
import { IPerson } from '@/types'
import { usePersons } from '@/hooks/admin/usePersons'
import { toast } from 'sonner'

export const FrmInscriptions = () => {
  const [showFile, setShowFile] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false)

  const { addPerson } = usePersons()

  const methods = useForm<IPerson>()

  const dateLimit = '2024-10-01'
  const inDate = new Date() < new Date(dateLimit)

  const handleUpdateFiles = (fileItems: any) => {
    setFiles(fileItems.map((fileItem: any) => fileItem.file))
  }

  const onSubmit = () => {
    setIsOpenAction(true)
  }

  const handleOnSubmit: SubmitHandler<IPerson> = async (data) => {
    const newData: IPerson = {
      ...data,
      typePerson: showFile ? 'speaker' : 'participant',
      file_resumen: '',
      isActived: false,
      image: '',
    }

    const res = await addPerson(newData)
    if (res === null) {
      resetForm()
      toast.success('Datos registrados con éxito', {
        description: 'Enviaremos un mensaje de confirmación a tu correo',
      })
    }

    setIsOpenAction(false)
  }

  const resetForm = () => {
    methods.setValue('name', '')
    methods.setValue('surName', '')
    methods.setValue('job', '')
    methods.setValue('institution', '')
    methods.setValue('location', '')
    methods.setValue('email', '')
    setFiles([])
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="w-full sm:grid flex flex-col sm:grid-cols-2 gap-4 sm:px-6"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <div className="col-span-2">
            <h3 className="text-sm sm:text-lg">
              <b>¿Listo para aprovechar la oportunidad?</b> Déjanos tus datos
              para descargar nuestra Carpeta de Eventos 2024 y explorar todas
              nuestras fórmulas de participación.
            </h3>
          </div>
          <Controller
            control={methods.control}
            name="name"
            rules={{ required: 'Este campo es requerido' }}
            render={({ field: { value, onChange } }) => (
              <Input
                label="Nombres"
                labelPlacement="outside"
                radius="sm"
                placeholder="Nombres"
                value={value}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.name !== undefined}
                errorMessage={methods.formState.errors.name?.message as string}
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
                errorMessage={
                  methods.formState.errors.surName?.message as string
                }
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
                errorMessage={methods.formState.errors.job?.message as string}
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
                errorMessage={
                  methods.formState.errors.institution?.message as string
                }
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
                  errorMessage={
                    methods.formState.errors.location?.message as string
                  }
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
                  errorMessage={
                    methods.formState.errors.email?.message as string
                  }
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
            required
          >
            Acepto los términos y condiciones
          </Checkbox>
          <div className="col-span-2">
            <Button
              radius="full"
              color="primary"
              type="submit"
              size="lg"
            >
              Enviar
            </Button>
          </div>
        </form>
      </FormProvider>
      <ModalAction
        isOpen={isOpenAction}
        setOpen={setIsOpenAction}
        message="¿Estás seguro de enviar tu inscripción?"
        title="Confirmar inscripción"
        onPress={methods.handleSubmit(handleOnSubmit)}
      />
    </>
  )
}
