import { Chip, Card, CardBody } from '@nextui-org/react'
import { IconCalendarEvent, IconMapPin, IconClock } from '@tabler/icons-react'
import { IEvent } from '@/types'

function formatDateToDDMMM(date: Date): string {
  const months = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC',
  ]

  const day = date.getDate()
  const monthIndex = date.getMonth()
  const month = months[monthIndex]

  return `${day.toString().padStart(2, '0')} ${month}`
}

interface IProps {
  event: IEvent
}

export const CardGalleryEvent = (props: IProps) => {
  const { event } = props
  const dateFormatted = formatDateToDDMMM(new Date(event.date as string))
  return (
    <div className="relative shadow-md">
      <div className="bg-transparent pt-5">
        <Card
          className="border px-3 py-4 sm:p-4 lg:px-4 lg:py-9"
          radius="sm"
          shadow="sm"
        >
          <CardBody>
            <Chip
              color="primary"
              size="sm"
              radius="sm"
              className="text-white font-bold"
            >
              Tag
            </Chip>
            <div className="pt-4 space-y-2">
              <h2 className="text-xl font-bold leading-tight">{event.name}</h2>
              {/* <p>{date}</p> */}
              <div className="flex items-center space-x-2">
                <IconCalendarEvent size={16} />
                <span className="text-sm">{event.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <IconClock size={16} />
                <span className="text-sm">
                  {event?.timeStart} a {event?.timeEnd}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <IconMapPin size={16} />
                <span className="text-sm">Location</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="bg-white px-4 py-2 absolute top-0 left-8 border-t-4 border-primary-400 shadow-md">
        <div className="font-bold text-lg sm:text-xl lg:text-2xl">
          {dateFormatted}
        </div>
      </div>
    </div>
  )
}
