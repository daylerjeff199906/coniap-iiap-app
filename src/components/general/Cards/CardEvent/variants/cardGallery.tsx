import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
    <Card className="rounded-sm" >
      {showImage && (
        <Image
          src={event.banner || 'https://via.placeholder.com/300x200'}
          alt="Event"
          className=""
          
        />
      )}
      <CardContent className="px-0 flex flex-col gap-2">
        <Link
          className="text-sm sm:text-lg xl:text-xl font-bold line-clamp-2 hover:underline hover:cursor-pointer"
          href={`/eventos/${event.id}`}
        >
          {event.name}
        </Link>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
          {event.shortDescription || ''}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end px-0">
        {/* <Button className="rounded-full" variant="secondary" asChild `}>
  <Link href={`/eventos/${event.id}>Ver más</Link>
</Button> */}
      </CardFooter>
    </Card>
  )
}
