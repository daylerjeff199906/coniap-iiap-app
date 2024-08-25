'use client'
import { useState } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import { ModalAction } from '@/components'
import { IPerson, IUser } from '@/types'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

import {
  ContactData,
  CountryData,
  InfoData,
  JobData,
  RoleData,
} from './sections'
import { createPerson, updateUser, fetchUserByEmail } from '@/api'

import infoData from '@/utils/json/infoConiap.json'
import { addContactToList } from '@/lib'
import { AlertCustom } from '@/modules/core'

function parseDate(date: string) {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface IProps {
  email?: string
  photo?: string
}

export const FrmInscriptionSteps = (props: IProps) => {
  const { email, photo } = props
  const [isOpenAction, setIsOpenAction] = useState<boolean>(false)

  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  const methods = useForm<IPerson>({
    defaultValues: {
      typePerson: 'participant',
      email,
      image: photo,
    },
  })

  const typePerson = methods.watch('typePerson')

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

  const handleOnSubmit: SubmitHandler<IPerson> = async (data: IPerson) => {
    setIsOpenAction(false)
    setLoading(true)
    const { imageFile, ...resData } = data

    if (data?.typePerson === 'participant') {
      const res: IPerson | null = await createPerson(resData)

      if (res) {
        const userApi: IUser | null = (await fetchUserByEmail(
          resData.email as string
        )) as IUser | null

        if (userApi && userApi.person === null && res) {
          await updateUser({
            ...userApi,
            person: res?.id ? Number(res?.id) : null,
            role: ['user'],
          })
        }

        await addContactToList(
          {
            email: resData.email as string,
            name: resData.name as string,
            surname: resData.surName as string,
          },
          7
        )

        toast.success('Inscripción realizada correctamente')
        router.push('/inscripciones/info')
      }
    } else {
      const resPerson = await createPerson(resData)
      if (resPerson) {
        const userApi: IUser | null = (await fetchUserByEmail(
          resData.email as string
        )) as IUser | null

        if (userApi && userApi.person === null && resPerson) {
          await updateUser({
            ...userApi,
            person: resPerson.id,
            role: ['speaker'],
          })
        }
        await addContactToList(
          {
            email: resData.email as string,
            name: resData.name as string,
            surname: resData.surName as string,
          },
          3
        )
        toast.success('Inscripción realizada correctamente')
        router.push('/inscripciones/success')
      }
    }

    setLoading(false)
  }

  const date = infoData.data.dates['date-conference'].start
  const dateSpeaker = infoData.data.dates.summary.end

  const dateFormatted = parseDate(date)
  const dateFormattedSpeaker = parseDate(dateSpeaker)

  const isBefore = new Date(date) > new Date()
  const isBeforeSpeaker = new Date(dateSpeaker) > new Date()

  return (
    <article className="w-full flex flex-col gap-5">
      <AlertCustom
        title={isBefore ? 'Nota: Fecha límite' : '¡Ya pasó la fecha límite!'}
        type={isBefore ? 'warning' : 'error'}
        showIcon
        message={
          <p className="text-sm ">
            <strong>Nota:</strong> La fecha límite para inscripciones como
            participante es {dateFormatted}.{' '}
            {isBefore ? '¡Aún tienes tiempo!' : '¡Ya pasó la fecha límite!'}
          </p>
        }
      />
      {isBefore && (
        <FormProvider {...methods}>
          <form
            className="w-full sm:grid flex flex-col sm:grid-cols-2 gap-4 sm:px-6"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className="w-full sm:grid flex flex-col sm:grid-cols-2 gap-4 col-span-2 border p-4 rounded-md">
              <InfoData />
              <JobData />
              <CountryData />
              <ContactData />
            </div>
            {isBeforeSpeaker && isSpeaker && (
              <AlertCustom
                title={
                  isBeforeSpeaker
                    ? 'Nota: Fecha límite'
                    : '¡Ya pasó la fecha límite!'
                }
                type={isBeforeSpeaker ? 'warning' : 'error'}
                message={
                  <p className="text-sm ">
                    <strong>Nota:</strong> La fecha límite para enviar
                    propuestas como ponente es {dateFormattedSpeaker}.{' '}
                    {isBeforeSpeaker
                      ? '¡Aún tienes tiempo!'
                      : '¡Ya pasó la fecha límite!'}
                  </p>
                }
                showIcon
              />
            )}
            {isBeforeSpeaker && <RoleData />}
            <div className="col-span-2 pt-3">
              <Button
                radius="sm"
                color="primary"
                type="submit"
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
