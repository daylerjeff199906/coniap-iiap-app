'use client'
import { Image } from '@nextui-org/react'
import { IEvent } from '@/types'
import { Button } from '@nextui-org/react'
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
        fullWidth
        color="primary"
        startContent={<IconCalendarMonth />}
        onPress={handleAddToCalendar}
        radius="sm"
      >
        Agregar a mi agenda
      </Button>
      {event?.sala?.url && (
        <Button
          href={event?.sala?.url || '#'}
          target="_blank"
          radius="sm"
          as={Link}
          variant="bordered"
          color="primary"
          className="text-primary-500"
          startContent={
            <Image
              src={socialNetworksLogo?.logo}
              alt="Sala"
              width={20}
              className="mr-2 flex-shrink-0"
            />
          }
        >
          Ir a {event?.sala?.name}
        </Button>
      )}
    </section>
  )
}
