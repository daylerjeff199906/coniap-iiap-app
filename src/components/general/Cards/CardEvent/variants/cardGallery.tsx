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
      className="bg-transparent border-0"
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
      <CardBody className="px-0 flex flex-col gap-2">
        <Link
          className="text-sm sm:text-lg xl:text-xl font-bold line-clamp-2 hover:underline hover:cursor-pointer"
          href={`/eventos/${event.id}`}
        >
          {event.name}
        </Link>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
          {event.shortDescription || ''}
        </p>
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
