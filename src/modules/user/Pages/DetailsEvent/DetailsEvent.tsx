'use client'
import ReactMarkdown from 'react-markdown'
import { IEvent } from '@/types'
import { Avatar, Image } from '@nextui-org/react'
import { IconCalendarClock, IconArrowNarrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import logo_iiap from '@/assets/images/logo_coniap_simple.webp'
import { UtilsActions } from './UtilsActions'
import { IconsShared } from './IconsShared'
import remarkGfm from 'remark-gfm'
import { formatDateLarge } from '@/utils/functions'

interface IProps {
  event: IEvent
}

export const DetailsEvent = (props: IProps) => {
  const { event } = props

  const cleanContent =
    event?.customContent && event.customContent.replace(/<[^>]*>?/gm, '')

  return (
    <main className="container section grid grid-cols-1 py-12 gap-6">
      <section>
        <div className="flex gap-4 items-center">
          <Link
            href="/eventos"
            className="text-primary-500  hover:text-primary-600 flex items-center gap-2"
          >
            <IconArrowNarrowLeft size={20} />
            Lista de eventos
          </Link>
        </div>
      </section>
      <header className="flex flex-col gap-1">
        <h4 className="text-sm text-gray-500">Detalles del evento</h4>
        <h1 className="text-2xl font-bold sm:text-4xl lg:text-[40px]">
          {event?.name}
        </h1>
      </header>
      <section className="flex flex-col sm:flex-row gap-6">
        <main className="w-full flex flex-col gap-6">
          <Image
            src={event?.banner || '/banner_coniap_simple.webp'}
            alt={event?.name}
            width={800}
            height={600}
            removeWrapper
            className="rounded-md w-full h-full object-cover bg-gray-300 min-h-28 min-w-full"
          />
          <IconsShared />
          <article className="w-full h-fit max-w-sm min-w-sm sm:hidden flex flex-col gap-4 sm:sticky sm:top-16 bg-gray-100 rounded-md p-4">
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-3">
                <div className="dot-custom" />
                <h1 className="text-2xl font-bold">Fecha y hora</h1>
              </div>
              <section className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                  <IconCalendarClock size={28} />
                  {event?.date && (
                    <p className="font-semibold">
                      {formatDateLarge(event?.date)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <IconCalendarClock size={28} />
                  <p className="font-semibold">
                    {event?.timeStart} - {event?.timeEnd}
                  </p>
                </div>
              </section>
            </div>
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-3">
                <div className="dot-custom" />
                <h1 className="text-2xl font-bold">Acerca de este evento</h1>
              </div>
              <p className="text-gray-500">{event?.shortDescription}</p>
            </div>
            <UtilsActions event={event} />
          </article>
          {event && event?.summary && event?.summary?.person && (
            <section className="space-y-6 w-full col-span-1 sm:col-span-8">
              <h1 className="text-2xl font-bold">Ponente</h1>
              <div className="flex items-center gap-4">
                <Avatar
                  src={event?.summary?.person?.image || logo_iiap.src}
                  className="w-24 h-24"
                />
                <div>
                  <div>
                    <h4 className="text-gray-400 text-sm">
                      {event?.summary?.person?.institution}
                    </h4>
                  </div>
                  <h2 className="text-lg font-semibold">
                    {event?.summary?.person?.name}
                  </h2>
                  <h3 className="">{event?.summary?.person?.surName}</h3>
                </div>
              </div>
            </section>
          )}
          {event && event.customContent && (
            <main className="col-span-1 sm:col-span-8">
              <div className="flex items-center gap-3 ">
                <div className="dot-custom" />
                <h1 className="text-2xl font-bold">Sobre el evento</h1>
              </div>
              <ReactMarkdown
                className="prose custom-quill"
                remarkPlugins={[remarkGfm]}
              >
                {cleanContent}
              </ReactMarkdown>
            </main>
          )}
        </main>
        <article className="w-full h-fit max-w-sm min-w-sm hidden sm:flex flex-col gap-4 sm:sticky sm:top-16 bg-gray-100 rounded-md p-4 ">
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-3">
              <div className="dot-custom" />
              <h1 className="text-xl font-bold">Fecha y hora</h1>
            </div>
            <div className="flex gap-2 items-center">
              <IconCalendarClock size={28} />
              <p className="font-semibold">
                {event?.date} - {event?.timeStart} - {event?.timeEnd}
              </p>
            </div>
          </div>
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-3">
              <div className="dot-custom" />
              <h1 className="text-xl font-bold">Acerca de este evento</h1>
            </div>
            <p className="text-gray-500 text-sm">{event?.shortDescription}</p>
          </div>
          <UtilsActions event={event} />
        </article>
      </section>
    </main>
  )
}
