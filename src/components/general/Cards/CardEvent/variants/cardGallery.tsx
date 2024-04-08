import { Card, CardBody, Image, CardFooter, Button } from '@nextui-org/react'
import { IconCalendarEvent, IconMapPin, IconClock } from '@tabler/icons-react'
import { IEvent } from '@/types'
import { formatDateToDDMMM } from '@/utils/functions'
import Link from 'next/link'

interface IProps {
  event: IEvent
  showImage?: boolean
}

export const CardGalleryEvent = (props: IProps) => {
  const { event, showImage = true } = props
  const dateFormatted = formatDateToDDMMM(event.date as string)
  return (
    <Card
      className="bg-white max-w-sm"
      radius="sm"
      shadow="none"
    >
      {showImage && (
        <Image
          src={event.banner || 'https://via.placeholder.com/300x200'}
          alt="Event"
          removeWrapper
          className=""
          radius="lg"
        />
      )}
      <CardBody className="px-0">
        <h3 className="text-sm sm:text-lg xl:text-xl font-bold">
          {event.name}
        </h3>
        <p className="text-sm line-clamp-3">Descripción del evento</p>
      </CardBody>
      <CardFooter className="flex justify-end px-0">
        {/* <Button
          radius="full"
          variant="flat"
          as={Link}
          href={`/eventos/${event.id}`}
        >
          Ver más
        </Button> */}
      </CardFooter>
    </Card>
  )
}
