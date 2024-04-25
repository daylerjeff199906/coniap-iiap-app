/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button, Divider } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { IEvent } from '@/types'
import { useEvents } from '@/hooks/admin'

interface IProps {
  //   isOpen: boolean
  event: IEvent
}

import {
  HeaderSection,
  InfoGeneral,
  MoreDescription,
  MoreInfo,
} from './sections'
import { LoadingPages } from '@/components'
export const FrmEditEvent = (props: IProps) => {
  const { event } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  const id = searchParams.get('edit') || ''

  const { updateDataEvent, loading } = useEvents()

  const methods = useForm<IEvent>({
    defaultValues: event,
  })

  const onSubmit: SubmitHandler<IEvent> = async (data: IEvent) => {
    const { ...rest } = data
    const dataNew = {
      ...rest,
      program_id: rest.program_id || null,
    }

    const res = await updateDataEvent(id, dataNew)
    if (res.message) {
      return null
    } else {
      clearForm()
      router.push('/admin/eventos')
    }
  }

  const clearForm = () => {
    methods.setValue('name', '')
    methods.setValue('timeStart', '')
    methods.setValue('timeEnd', '')
    methods.setValue('date', '')
    methods.setValue('shortDescription', '')
    methods.setValue('sala', '')
    methods.setValue('linkZoom', '')
    methods.setValue('linkYoutube', '')
    methods.setValue('linkFacebook', '')
    methods.setValue('customContent', '')
  }

  return (
    <>
      <main className="w-full max-w-3xl">
        <FormProvider {...methods}>
          <header>
            <h2 className="text-2xl font-bold">Editar evento: {event?.name}</h2>
          </header>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <main className="grid grid-cols gap-6">
              <HeaderSection />
              <div
                id="info-general"
                className="grid grid-col gap-3"
              >
                <div className="space-y-1">
                  <h1 className="text-sm font-semibold">Información general</h1>
                  <h2 className="text-tiny text-gray-500">
                    Ingresa la información general del evento, como el nombre,
                    la fecha, la hora de inicio y fin, la descripción corta, la
                    sala.
                  </h2>
                  <Divider />
                </div>
                <InfoGeneral />
              </div>
              <div
                id="more-info"
                className="grid grid-col gap-3"
              >
                <div className="space-y-1">
                  <h1 className="text-sm font-semibold">
                    Enlaces de las plataformas
                  </h1>
                  <h2 className="text-tiny text-gray-500">
                    Agrega los enlaces de las plataformas donde se llevará a
                    cabo el evento.
                  </h2>
                  <Divider />
                </div>
                <MoreInfo />
              </div>
              <div
                id="custom-content"
                className="grid grid-col gap-3"
              >
                <h1 className="text-sm font-semibold">
                  Contenido Personalizado
                </h1>
                <MoreDescription defaultContent={event?.customContent ?? ''} />
              </div>
            </main>
            <footer className="pt-4">
              <div className="flex items-center gap-3 justify-end">
                <Button
                  color="primary"
                  isDisabled={loading}
                  isLoading={loading}
                  type="submit"
                >
                  Guardar cambios
                </Button>
                <Button
                  onPress={() => {
                    router.push('/admin/eventos')
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </footer>
          </form>
        </FormProvider>
      </main>
      <LoadingPages isOpen={loading} />
    </>
  )
}
