import { IEvent } from '@/types'
import { Avatar, Button, Divider, Image } from '@nextui-org/react'
import { IconCalendarClock, IconArrowNarrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import logo_iiap from '@/assets/images/logo_coniap_simple.webp'
interface IProps {
  event: IEvent
}

interface ISection {
  htmlContent: string
}

export const DetailsEvent = (props: IProps) => {
  const { event } = props

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
          <Divider
            orientation="vertical"
            className="bg-primary-500 h-6 w-[1px]"
          />
          <Link
            href="/agenda"
            className="text-primary-500  hover:text-primary-600"
          >
            Ir a Agenda
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
              <DisplayHTMLContent htmlContent={event?.customContent} />
            </main>
          )}
        </main>
        <article className="w-full h-fit max-w-sm min-w-sm flex flex-col gap-6 sm:sticky sm:top-16 bg-gray-100 rounded-md p-4">
          <div className="space-y-2 w-full">
            <div className="flex items-center gap-3">
              <div className="dot-custom" />
              <h1 className="text-2xl font-bold">Fecha y hora</h1>
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
              <h1 className="text-2xl font-bold">Acerca de este evento</h1>
            </div>
            <p className="text-gray-500">{event?.shortDescription}</p>
          </div>
        </article>
      </section>
    </main>
  )
}

function DisplayHTMLContent({ htmlContent }: ISection) {
  return (
    <div
      className=".custom-quill"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
