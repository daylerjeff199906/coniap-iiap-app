/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useMemo, useState } from 'react'
import {
  Button,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
} from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'

import { IEvent } from '@/types'
import { useEvents } from '@/hooks/admin'

interface IProps {
  isOpen: boolean
  event: IEvent | null
}

import { InfoGeneral, MoreDescription, MoreInfo } from './sections'
export const FrmEditEvent = (props: IProps) => {
  const { isOpen, event } = props
  const router = useRouter()
  const searchParams = useSearchParams()
  //   const isEdit = searchParams.get('edit') !== null

  const id = searchParams.get('edit') || ''

  const [isEditables, setIsEditables] = useState(true)

  const { updateEvent, loading } = useEvents()

  const methods = useForm<IEvent>()

  const onSubmit: SubmitHandler<IEvent> = (data: IEvent) => {
    updateEvent(id, data)
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
    // methods.setValue('place', '')
    // methods.setValue('banner', '')
    // methods.setValue('images', [])
    // methods.setValue('sala', '')
    methods.setValue('linkZoom', '')
    methods.setValue('linkYoutube', '')
    methods.setValue('linkFacebook', '')
    methods.setValue('customContent', '')
  }

  useEffect(() => {
    if (event) {
      methods.setValue('name', event.name)
      methods.setValue('timeStart', event.timeStart)
      methods.setValue('timeEnd', event.timeEnd)
      methods.setValue('date', event.date)
      methods.setValue('shortDescription', event.shortDescription)
      // methods.setValue('place', event.place)
      // methods.setValue('banner', event.banner)
      // methods.setValue('images', event.images)
      // methods.setValue('sala', event.sala)
      methods.setValue('linkZoom', event.linkZoom)
      methods.setValue('linkYoutube', event.linkYoutube)
      methods.setValue('linkFacebook', event.linkFacebook)
      methods.setValue('customContent', event.customContent)
    }
  }, [event])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          router.push('/admin/eventos')
          setIsEditables(true)
        }}
        size="full"
        scrollBehavior="inside"
      >
        <ModalContent>
          <FormProvider {...methods}>
            <ModalHeader>
              <h2 className="text-2xl font-bold">
                {isEditables ? 'Editar evento' : 'Detalles de evento'}
              </h2>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <main className="grid grid-cols-1 gap-6">
                  <section className="space-y-2">
                    <header className="w-full">
                      <div className="w-full p-2 relative">
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
                      </div>
                      <div className="w-full relative">
                        <Image
                          src={
                            event?.banner ||
                            'https://img.freepik.com/foto-gratis/empresario-corporativo-dando-presentacion-gran-audiencia_53876-101865.jpg?t=st=1710697716~exp=1710701316~hmac=dd6c12b08873fb1628ee817174cc33d849c90c12647ce58e71911d1ba4451eeb&w=1380'
                          }
                          alt="Banner"
                          radius="none"
                          removeWrapper
                          className="w-full h-72 object-cover"
                        />
                        <div className="absolute top-0 bottom-0 z-10 flex flex-col justify-center p-4 sm:p-8 lg:p-14 bg-black/45">
                          <h1 className="text-4xl font-bold text-white">
                            {methods.watch('name')}
                          </h1>
                          <div className="flex gap-2">
                            <p className="text-sm text-gray-300">
                              {methods.watch('date')} -{' '}
                              {methods.watch('timeStart')} -
                              {methods.watch('timeEnd')}
                            </p>
                          </div>
                          <p className="text-white">
                            {methods.watch('shortDescription') ||
                              'No tiene descripción corta'}
                          </p>
                        </div>
                      </div>
                    </header>
                    <div className="space-y-3">
                      <h1 className="text-sm font-semibold">
                        Información general
                      </h1>
                      {isEditables ? (
                        <>
                          <div className="grid grid-cols-2 gap-5">
                            <InfoGeneral />
                            <MoreInfo />
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <h3>Links de acceso al evento</h3>
                            <div className="flex gap-4">
                              <Link
                                href={event?.linkZoom}
                                target="_blank"
                                showAnchorIcon
                              >
                                Zoom
                              </Link>
                              <Link
                                href={event?.linkYoutube}
                                target="_blank"
                                showAnchorIcon
                              >
                                Youtube
                              </Link>
                              <Link
                                href={event?.linkFacebook}
                                target="_blank"
                                showAnchorIcon
                              >
                                Facebook
                              </Link>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="space-y-3">
                      <h1 className="text-sm font-semibold">
                        Contenido Personalizado
                      </h1>
                      {isEditables ? (
                        <>
                          <MoreDescription
                            defaultContent={event?.customContent ?? ''}
                          />
                        </>
                      ) : (
                        <div className="w-full">
                          {event?.customContent && (
                            <div
                              className="w-full"
                              dangerouslySetInnerHTML={{
                                __html: event?.customContent,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </section>
                </main>
              </form>
            </ModalBody>
            <ModalFooter>
              {isEditables && (
                <div className="flex items-center gap-3 justify-end">
                  <Button
                    color="primary"
                    isDisabled={loading}
                    isLoading={loading}
                    onPress={() => {
                      methods.handleSubmit(onSubmit)()
                    }}
                  >
                    Guardar cambios
                  </Button>
                  <Button
                    onPress={() => {
                      router.push('/admin/eventos')
                      setIsEditables(true)
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </ModalFooter>
          </FormProvider>
        </ModalContent>
      </Modal>
    </>
  )
}
