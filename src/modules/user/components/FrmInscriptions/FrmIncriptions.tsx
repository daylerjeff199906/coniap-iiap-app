'use client'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { ModalAction } from '@/components'
import { IInscription, IPerson } from '@/types'
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
import { registerWithEmail } from '@/auth'

import data from '@/utils/json/infoConiap.json'

export const FrmInscriptions = () => {
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false)

  const { addPerson } = usePersons()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const methods = useForm<IInscription>()

  const typePerson = methods.watch('typePerson')
  const email = methods.watch('email')
  const message =
    typePerson === 'participant' ? (
      <>
        <p className="text-sm">¿Estás seguro de enviar tu inscripción?</p>
      </>
    ) : (
      <div className="text-sm">
        <p>
          Se enviará un mensaje de confirmación a tu correo
          <b>{email}</b>, ¿Estás seguro de enviar tu inscripción?
        </p>
      </div>
    )

  const onSubmit = () => {
    setIsOpenAction(true)
  }

  const handleOnSubmit: SubmitHandler<IInscription> = async (
    data: IInscription
  ) => {
    setIsOpenAction(false)
    setLoading(true)
    const { password, password_confirmation, ...resData } = data

    if (data?.typePerson !== 'participant') {
      const res = await registerWithEmail({
        email: resData.email,
        password,
      })
      if (typeof res === 'string') {
        toast.error(res)
        return setLoading(false)
      } else {
        const newData: IPerson = {
          ...resData,
          typePerson: 'speaker',
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
    } else {
      const newData: IPerson = {
        ...resData,
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
    setLoading(false)
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
              isLoading={loading}
              isDisabled={loading}
            >
              Enviar inscripción
            </Button>
          </div>
        </form>
      </FormProvider>
      <ModalAction
        isOpen={isOpenAction}
        setOpen={setIsOpenAction}
        title="Confirmar inscripción"
        bodyMessage={message}
        onPress={methods.handleSubmit(handleOnSubmit)}
      />
    </>
  )
}
