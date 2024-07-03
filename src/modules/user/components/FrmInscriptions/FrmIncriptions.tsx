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
import { registerAndSendEmailVerification } from '@/auth'

import infoData from '@/utils/json/infoConiap.json'

function parseDate(date: string) {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const FrmInscriptions = () => {
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false)

  const { addPerson } = usePersons()
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const methods = useForm<IInscription>({
    defaultValues: {
      typePerson: 'participant',
    },
  })

  const typePerson = methods.watch('typePerson')
  const email = methods.watch('email')

  const isSpeaker = typePerson === 'speaker'

  const message =
    typePerson === 'participant' ? (
      <>
        <p className="text-sm">¿Estás seguro de enviar tu inscripción?</p>
      </>
    ) : (
      <div className="text-sm">
        <p>
          Se enviará un mensaje de confirmación a tu correo <b>{email}</b>,
          ¿Estás seguro de realizar la inscripción?
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
      const res = await registerAndSendEmailVerification({
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
            position: 'top-right',
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
          description:
            'Mantente atento a tu correo, te enviaremos más información',
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

  const date = infoData.data.dates['date-conference'].start
  const dateSpeaker = infoData.data.dates.summary.end

  const dateFormatted = parseDate(date)
  const dateFormattedSpeaker = parseDate(dateSpeaker)

  const isBefore = new Date(date) > new Date()
  const isBeforeSpeaker = new Date(dateSpeaker) > new Date()

  return (
    <article className="w-full flex flex-col gap-5">
      <section
        className={`p-4 border rounded-lg font-medium flex flex-col gap-2 sm:mx-4 ${
          isBefore
            ? 'border-warning-500 bg-warning-100 text-warning-700'
            : 'bg-danger-100 border-danger-500 text-danger-700'
        }`}
      >
        <p className="text-sm ">
          <strong>Nota:</strong> La fecha límite para inscripciones como
          participante es {dateFormatted}.{' '}
          {isBefore ? '¡Aún tienes tiempo!' : '¡Ya pasó la fecha límite!'}
        </p>
      </section>
      {isBefore && (
        <FormProvider {...methods}>
          <form
            className="w-full sm:grid flex flex-col sm:grid-cols-2 gap-4 sm:px-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InfoData />
            <JobData />
            <CountryData />
            <ContactData />
            {isBeforeSpeaker && isSpeaker && (
              <section
                className={`p-4 border rounded-lg font-medium flex flex-col gap-2 col-span-2 ${
                  isBefore
                    ? 'border-warning-500 bg-warning-100 text-warning-700'
                    : 'bg-danger-100 border-danger-500 text-danger-700'
                }`}
              >
                <p className="text-sm ">
                  <strong>Nota:</strong> La fecha límite para enviar propuestas
                  como ponente es {dateFormattedSpeaker}.{' '}
                  {isBeforeSpeaker
                    ? '¡Aún tienes tiempo!'
                    : '¡Ya pasó la fecha límite!'}
                </p>
              </section>
            )}
            {isBeforeSpeaker && <RoleData />}
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
      )}
      <ModalAction
        isOpen={isOpenAction}
        setOpen={setIsOpenAction}
        title="Confirmar inscripción"
        bodyMessage={message}
        onPress={methods.handleSubmit(handleOnSubmit)}
      />
    </article>
  )
}
