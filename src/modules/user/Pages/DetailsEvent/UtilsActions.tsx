'use client'
import { IEvent } from '@/types'
import { Button } from '@nextui-org/react'
import { IconCalendarMonth } from '@tabler/icons-react'

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

  return (
    <section className="w-full">
      <Button
        radius="sm"
        fullWidth
        color="primary"
        startContent={<IconCalendarMonth />}
      >
        Agregar a mi agenda
      </Button>
    </section>
  )
}
