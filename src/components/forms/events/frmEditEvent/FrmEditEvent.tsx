/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState } from 'react'
import { Button, Link, Switch } from '@nextui-org/react'
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
  //   const isEdit = searchParams.get('edit') !== null

  const id = searchParams.get('edit') || ''

  // const [isEditables, setIsEditables] = useState(true)

  const { updateDataEvent, loading } = useEvents()

  const methods = useForm<IEvent>({
    defaultValues: event,
  })

  const onSubmit: SubmitHandler<IEvent> = async (data: IEvent) => {
    const { persons, ...rest } = data

    await updateDataEvent(id, rest)
      .then(() => {
        clearForm()
        router.push('/admin/eventos')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const clearForm = () => {
    methods.setValue('name', '')
    methods.setValue('timeStart', '')
    methods.setValue('timeEnd', '')
    methods.setValue('date', '')
    methods.setValue('shortDescription', '')
    methods.setValue('sala', '')
    methods.setValue('persons', null)
    methods.setValue('linkZoom', '')
    methods.setValue('linkYoutube', '')
    methods.setValue('linkFacebook', '')
    methods.setValue('customContent', '')
  }

  return (
    <>
      <FormProvider {...methods}>
        <header>
          <h2 className="text-2xl font-bold">Editar evento: {event?.name}</h2>
        </header>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <main className="grid grid-cols-1 gap-6">
            <section className="space-y-2">
              <header className="w-full">
                {/* <div className="w-full p-2 relative">
                  <Switch
                    defaultChecked={isEditables}
                    //   checked={isEditables}
                    onValueChange={() => setIsEditables(!isEditables)}
                    className="absolute top-8 right-6 z-30 "
                  >
                    <p className="text-white">
                      {isEditables ? 'Vizualizar' : 'Editar'}
                    </p>
                  </Switch>
                </div> */}
                <HeaderSection />
              </header>
              <div className="space-y-3">
                <h1 className="text-sm font-semibold">Información general</h1>
                <div className="grid grid-cols-2 gap-5">
                  <InfoGeneral />
                  <MoreInfo />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-sm font-semibold">
                  Contenido Personalizado
                </h1>
                <MoreDescription defaultContent={event?.customContent ?? ''} />
              </div>
            </section>
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
      <LoadingPages isOpen={loading} />
    </>
  )
}
