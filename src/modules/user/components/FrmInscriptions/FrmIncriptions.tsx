'use client'
import {
  useForm,
  Controller,
  FormProvider,
  SubmitHandler,
} from 'react-hook-form'
import { Button, Checkbox, Input } from '@nextui-org/react'
import { useState } from 'react'
import { ModalAction } from '@/components'
import { IPerson } from '@/types'
import { usePersons } from '@/hooks/admin'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { InfoData, JobData } from './sections'

export const FrmInscriptions = () => {
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false)

  const { addPerson, loading: loadAddPerson } = usePersons()
  const router = useRouter()

  const methods = useForm<IPerson>()

  const dateLimit = '2024-10-01'

  const onSubmit = () => {
    setIsOpenAction(true)
  }

  const handleOnSubmit: SubmitHandler<IPerson> = async (data) => {
    setIsOpenAction(false)
    const newData: IPerson = {
      ...data,
      typePerson: 'participant',
      isActived: false,
      image: '',
    }

    const res: IPerson = await addPerson(newData)

    if (res !== null) {
      resetForm()
      toast.success('Datos registrados con éxito', {
        description: 'Enviaremos un mensaje de confirmación a tu correo',
      })
      router.push('/inscripciones/success')
    }
  }

  const resetForm = () => {
    methods.setValue('name', '')
    methods.setValue('surName', '')
    methods.setValue('job', '')
    methods.setValue('institution', '')
    methods.setValue('location', '')
    methods.setValue('email', '')
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
              <b>¿Listo para aprovechar la oportunidad?</b> Déjanos tingresa tus
              datos y participa de las conferencias y asegura tu certificado de
              participación.
            </h3>
          </div>
          <InfoData />
          <JobData />
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
                value={value || ''}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.location !== undefined}
                errorMessage={
                  methods.formState.errors.location?.message as string
                }
              />
            )}
          />
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
                value={value || ''}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.email !== undefined}
                errorMessage={methods.formState.errors.email?.message as string}
              />
            )}
          />
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
              isLoading={loadAddPerson}
              isDisabled={loadAddPerson}
            >
              Enviar inscripción
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
