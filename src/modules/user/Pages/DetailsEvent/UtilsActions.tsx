'use client'
import NextImage from 'next/image'
import { IEvent } from '@/types'
import { Button } from '@/components/ui/button'
import { IconCalendarMonth } from '@tabler/icons-react'
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
    <section className="w-full flex flex-col gap-3">
      <Button
        variant="default"
        onClick={handleAddToCalendar}
        className="w-full font-bold gap-2"
      >
        <IconCalendarMonth size={20} />
        Agregar a mi agenda
      </Button>
      {event?.sala?.url && (
        <Button
          variant="outline"
          asChild
          className="w-full font-bold"
        >
          <Link href={event?.sala?.url || '#'} target="_blank">
            {socialNetworksLogo?.logo && (
              <NextImage
                src={socialNetworksLogo?.logo}
                alt="Platform"
                width={20}
                height={20}
                className="mr-2 h-5 w-5 object-contain"
              />
            )}
            Ir a {event?.sala?.name}
          </Link>
        </Button>
      )}
    </section>
  )
}
