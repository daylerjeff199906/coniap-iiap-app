'use client'
import { useState } from 'react'
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
import { useRouter } from 'next/navigation'

import { IEvent } from '@/types'

interface IProps {
  isOpen: boolean
  event: IEvent
}

import { InfoGeneral, MoreDescription, MoreInfo } from './sections'
export const FrmEditEvent = (props: IProps) => {
  const { isOpen, event } = props
  const router = useRouter()

  const [isEditables, setIsEditables] = useState(false)
  const methods = useForm<IEvent>({
    defaultValues: event,
  })

  const onSubmit: SubmitHandler<IEvent> = (data: IEvent) => {
    console.log(data)
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={() => {
          router.push('/admin/eventos')
        }}
        size="full"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <div className="w-full p-2">
              <Switch
                checked={isEditables}
                onValueChange={() => setIsEditables(!isEditables)}
              >
                Editar
              </Switch>
            </div>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <main className="grid grid-cols-1 gap-6">
                  <section className="space-y-2">
                    <header className="w-full">
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
                                href={event.linkZoom}
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
                                href={event.linkFacebook}
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
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            {isEditables && (
              <div className="flex items-center gap-4 justify-end">
                <Button
                  color="primary"
                  onPress={() => {
                    methods.handleSubmit(onSubmit)
                  }}
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
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
