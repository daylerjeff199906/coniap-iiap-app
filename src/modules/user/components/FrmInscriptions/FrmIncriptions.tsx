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
import {
  ContactData,
  CountryData,
  InfoData,
  JobData,
  RoleData,
} from './sections'
import data from '@/utils/json/infoConiap.json'

export const FrmInscriptions = () => {
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false)

  const { addPerson, loading: loadAddPerson } = usePersons()
  const router = useRouter()

  const methods = useForm<IPerson>()

  const onSubmit = () => {
    setIsOpenAction(true)
  }

  const handleOnSubmit: SubmitHandler<IPerson> = async (data) => {
    // setIsOpenAction(false)
    // const newData: IPerson = {
    //   ...data,
    //   typePerson: 'participant',
    //   isActived: false,
    //   image: '',
    // }

    // const res: IPerson = await addPerson(newData)

    // if (res !== null) {
    //   resetForm()
    //   toast.success('Datos registrados con éxito', {
    //     description: 'Enviaremos un mensaje de confirmación a tu correo',
    //   })
    //   router.push('/inscripciones/success')
    // }
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
            <h3 className="text-sm">
              <b>Regístrate para participar</b> Participa como asistente a los
              eventos, o si deseas presentar tu trabajo de investigación, puedes
              hacerlo como ponente.
            </h3>
          </div>
          <InfoData />
          <JobData />
          <CountryData />
          <ContactData />
          <RoleData />
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
