import { BannerStatic } from '@/components'
import { IEvent } from '@/types'
import { Avatar, Button, Divider } from '@nextui-org/react'
import { IconCalendarClock, IconArrowNarrowLeft } from '@tabler/icons-react'
import Link from 'next/link'
import logo_iiap from '@/assets/images/logo_coniap_simple.webp'
import logo_zoom from '@/assets/svg/zoom_icon.svg'
import logo_facebook from '@/assets/svg/facebook_icon.svg'
import logo_youtube from '@/assets/svg/youtube.svg'
import Image from 'next/image'

interface IProps {
  event: IEvent
}

interface ISection {
  htmlContent: string
}

export const DetailsEvent = (props: IProps) => {
  const { event } = props

  const subtitle = `Hora: ${event?.timeStart} - ${event?.timeEnd}`
  return (
    <>
      <BannerStatic
        title={event?.name}
        subtitle={subtitle}
        description={event?.date || ''}
        urlImage={event?.banner || ''}
      />
      <main className="container section grid grid-cols-1 sm:flex max-w-7xl py-12 gap-6">
        <section className="space-y-7 sm:space-y-8 lg:space-y-12 w-full">
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
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="dot-custom" />
              <h1 className="text-2xl font-bold">Fecha y hora</h1>
            </div>
            <div className="flex gap-2 items-center">
              <IconCalendarClock size={20} />
              <p className="font-semibold">
                {event?.date} - {event?.timeStart} - {event?.timeEnd}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Acerca de este evento</h1>
            <p>{event?.shortDescription}</p>
          </div>
          <section className="space-y-6 w-full">
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
          <article>
            {event && event.customContent && (
              <>
                <h1 className="text-2xl font-bold">Sobre la conferencia</h1>
                <DisplayHTMLContent htmlContent={event?.customContent} />
              </>
            )}
          </article>
        </section>
        <aside className="w-full max-w-sm">
          <section className="py-6 space-y-6 border rounded-lg px-8">
            <h1 className="text-xl font-semibold text-center">
              Sigue la conferencia por:
            </h1>
            <div className="flex flex-col gap-3">
              <Button
                fullWidth
                radius="sm"
                size="lg"
                variant="bordered"
                className="text-[#2d8bdc] border-[#2d8bdc] hover:bg-[#2d8bdc]/90  hover:text-white font-semibold"
              >
                <Image
                  src={logo_zoom}
                  alt="Zoom"
                  width={32}
                  height={32}
                />
                Zoom
              </Button>
              <Button
                fullWidth
                radius="sm"
                size="lg"
                variant="bordered"
                className="text-[#ff0000] border-[#ff0000] hover:bg-[#ff0000]/90  hover:text-white font-semibold"
              >
                <Image
                  src={logo_youtube}
                  alt="Youtube"
                  width={32}
                  height={32}
                />
                Youtube
              </Button>
              <Button
                fullWidth
                radius="sm"
                size="lg"
                className="bg-[#3b5998] hover:bg-[#3b5998] text-white font-semibold"
              >
                <Image
                  src={logo_facebook}
                  alt="Facebook"
                  width={32}
                  height={32}
                />
                Facebook
              </Button>
            </div>
          </section>
        </aside>
      </main>
    </>
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
