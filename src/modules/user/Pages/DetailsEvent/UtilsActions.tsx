'use client'
import NextImage from 'next/image'
import { IEvent } from '@/types'
import { Button } from '@/components/ui/button'
import { IconCalendarMonth, IconExternalLink } from '@tabler/icons-react'
import socialNetworks from '@/utils/json/social_networks.json'
import Link from 'next/link'

interface IProps {
  event: IEvent
}

export const UtilsActions = (props: IProps) => {
  const { event } = props

  const handleAddToCalendar = () => {
    const startDate = new Date(event.date + 'T' + event.timeStart)
      .toISOString()
      .replace(/-|:|\.\d{3}/g, '')
    const endDate = new Date(event.date + 'T' + event.timeEnd)
      .toISOString()
      .replace(/-|:|\.\d{3}/g, '')
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      event.name
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      event.shortDescription
    )}`

    window.open(url, '_blank')
  }

  const socialNetworksLogo = socialNetworks.find(
    (item) => item?.id === event?.sala?.platform || ''
  )

  return (
    <section className="w-full flex flex-col gap-4 p-6 bg-muted/30 border-2 border-dashed rounded-3xl animate-in zoom-in duration-500">
      <div className="space-y-1">
        <h3 className="text-xs font-black tracking-widest text-muted-foreground uppercase text-center">Acciones Rápidas</h3>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="default"
          onClick={handleAddToCalendar}
          className="w-full h-12 font-black uppercase italic tracking-tighter gap-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-base"
        >
          <IconCalendarMonth size={22} stroke={2.5} />
          Agendar Evento
        </Button>

        {event?.sala?.url && (
          <Button
            variant="outline"
            asChild
            className="w-full h-12 font-black uppercase italic tracking-tighter gap-3 rounded-2xl border-2 hover:bg-background shadow-md transition-all text-base"
          >
            <Link href={event?.sala?.url || '#'} target="_blank">
              {socialNetworksLogo?.logo ? (
                <NextImage
                  src={socialNetworksLogo?.logo}
                  alt="Platform"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                />
              ) : (
                <IconExternalLink size={22} stroke={2.5} />
              )}
              <span>Ir a {event?.sala?.name}</span>
            </Link>
          </Button>
        )}
      </div>
    </section>
  )
}
