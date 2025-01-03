'use client'
import { useState } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import { ModalAction } from '@/components'
import { IInscription, IPerson } from '@/types'
import { usePersons } from '@/hooks/admin'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { getConferenceStatus, formatDate } from '@/utils/functions'

import {
  ContactData,
  CountryData,
  InfoData,
  JobData,
  RoleData,
} from './sections'
import { registerAndSendEmailVerification } from '@/auth'

import infoData from '@/utils/json/infoConiap.json'
import { AlertCustom } from '@/modules/core'
import { addContactToList } from '@/lib'

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
        const res: IPerson | null = await addPerson(newData)
        if (res !== null) {
          await addContactToList(
            {
              email: newData.email,
              name: newData.name,
              surname: newData.surName,
            },
            3
          )
          resetForm()
          toast.success(
            `Datos registrados con éxito, se ha enviado un correo de verificación a ${resData.email}`
          )
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
        await addContactToList(
          {
            email: newData.email,
            name: newData.name,
            surname: newData.surName,
          },
          7
        )
        resetForm()
        toast.success(
          `Datos registrados con éxito. ¡Gracias por inscribirte!,En breve te enviaremos un correo de confirmación a ${newData.email}`
        )
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

  const { isBeforeConference, isBeforeSummary } = getConferenceStatus(
    infoData.data.dates
  )

  const dateFormatted = formatDate(
    infoData.data.dates['date-conference'].start,
    'DD/MM/YYYY'
  )

  const dateFormattedSpeaker = formatDate(
    infoData.data.dates.summary.end,
    'DD/MM/YYYY'
  )

  return (
    <article
      id="form-inscriptions"
      className="w-full flex flex-col gap-5"
    >
      <section className="lg:px-4">
        <AlertCustom
          type={isBeforeConference ? 'warning' : 'error'}
          title="Nota: Fecha límite"
          showIcon
          message={`La fecha límite para inscripciones como participante es ${dateFormatted}. ${
            isBeforeConference
              ? '¡Aún tienes tiempo!'
              : '¡Ya pasó la fecha límite!'
          }`}
        />
      </section>
      {isBeforeConference && (
        <FormProvider {...methods}>
          <form
            className="w-full flex flex-col gap-6 sm:px-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <section
              className="w-full sm:grid flex flex-col sm:grid-cols-2 gap-4"
              id="personal-data"
            >
              <InfoData />
              <JobData />
              <CountryData />
              <ContactData />
            </section>
            {isBeforeSummary && isSpeaker && (
              <section className="">
                <AlertCustom
                  type={isBeforeSummary ? 'warning' : 'error'}
                  title="Nota: Fecha límite"
                  message={`La fecha límite para enviar propuestas como ponente es ${dateFormattedSpeaker}. ${
                    isBeforeSummary
                      ? '¡Aún tienes tiempo!'
                      : '¡Ya pasó la fecha límite!'
                  }`}
                  showIcon
                />
              </section>
            )}
            {isBeforeSummary && <RoleData />}
            <div className="w-full">
              <Button
                id="btn-submit-inscription"
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
