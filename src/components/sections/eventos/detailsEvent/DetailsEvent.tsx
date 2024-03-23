import { BannerStatic } from '@/components'
import { IEvent } from '@/types'
import { Button } from '@nextui-org/react'
import { IconCalendarClock, IconClock } from '@tabler/icons-react'

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
        description={event?.date}
        urlImage={event?.banner || ''}
      />
      <main className="container section flex max-w-7xl py-12 gap-5">
        <section className="space-y-6 w-full">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Fecha y hora</h1>
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
          <article>
            <h1 className="text-2xl font-bold">Sobre la conferencia</h1>
            {event && event.customContent && (
              <DisplayHTMLContent htmlContent={event?.customContent} />
            )}
          </article>
        </section>
        <aside className="hidden lg:block w-full max-w-sm">
          <section className="py-6 space-y-6 border rounded-lg px-8">
            <h1 className="text-xl font-semibold text-center">
              Sigue la conferencia por:
            </h1>
            <div className="flex flex-col gap-3">
              <Button
                fullWidth
                radius="sm"
                variant="solid"
                className="bg-[#2d8bdc] hover:bg-[#2d8bdc] text-white font-semibold"
              >
                Zoom
              </Button>
              <Button
                fullWidth
                radius="sm"
                className="bg-[#ff0000] hover:bg-[#ff0000] text-white font-semibold"
              >
                Youtube
              </Button>
              <Button
                fullWidth
                radius="sm"
                className="bg-[#3b5998] hover:bg-[#3b5998] text-white font-semibold"
              >
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
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}
