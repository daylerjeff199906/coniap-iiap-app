'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import { Image } from '@nextui-org/react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'

import { InfoGeneral, MoreInfo } from './sections'
export const FrmEditEvent = (event: IEvent) => {
  const [isEditables, setIsEditables] = useState(false)
  const methods = useForm<IEvent>()
  return (
    <>
      <FormProvider {...methods}>
        <main className="grid grid-cols-3 gap-4">
          <section className="col-span-1">
            <form>
              <InfoGeneral />
              <MoreInfo />
            </form>
          </section>
          <section className="col-span-2 space-y-2">
            <header className="w-full">
              <div className="w-full relative">
                <Image
                  src={
                    event?.banner ||
                    'https://img.freepik.com/foto-gratis/empresario-corporativo-dando-presentacion-gran-audiencia_53876-101865.jpg?t=st=1710697716~exp=1710701316~hmac=dd6c12b08873fb1628ee817174cc33d849c90c12647ce58e71911d1ba4451eeb&w=1380'
                  }
                  alt="Banner"
                  removeWrapper
                  className="w-full h-80 object-cover rounded-lg"
                />
                <div className="absolute top-0 bottom-0 z-10 flex flex-col justify-center p-4 sm:p-8 lg:p-14 bg-black/45">
                  <h1 className="text-2xl font-bold text-white">
                    {event?.name}
                  </h1>
                  <div className="flex gap-2">
                    <p className="text-sm text-gray-300">
                      {event?.date} - {event?.timeStart} - {event?.timeEnd}
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <div>
              <h1 className="text-xl font-semibold">Descripción</h1>
              <p className="text-sm">{event?.shortDescription}</p>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Contenido Personalizado</h1>
              {isEditables ? (
                <div></div>
              ) : (
                <div className="w-full">
                  {event?.customContent && (
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: event?.customContent }}
                    />
                  )}
                </div>
              )}
            </div>
          </section>
        </main>
      </FormProvider>
    </>
  )
}
