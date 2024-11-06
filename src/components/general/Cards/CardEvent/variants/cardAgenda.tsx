'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import {
  Card,
  CardBody,
  CardFooter,
  Chip,
  Divider,
  Image,
  User,
} from '@nextui-org/react'
import Link from 'next/link'
import { IconCalendarEvent, IconClockFilled } from '@tabler/icons-react'
import { formatDate } from '@/utils/functions'

import logo from '@/assets/images/logo_coniap_simple.webp'

interface IProps {
  event: IEvent
  showImage?: boolean
}

// function formatTime

// function parseDateLarge(date: string) {
//   const dateObj = new Date(date)
//   const options: Intl.DateTimeFormatOptions = {
//     weekday: 'long',
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//   }
//   return new Intl.DateTimeFormat('es-ES', options).format(dateObj)
// }

export const CardAgendaEvent = (props: IProps) => {
  const { event, showImage } = props
  const [isHover, setIsHover] = useState(false)

  const isMagistral =
    event?.summary?.person &&
    event?.summary?.person?.typePerson === 'speaker_mg'

  return (
    <Card
      className={`w-full bg-white transition-shadow duration-300 ease-in-out ${
        isHover ? 'shadow-sm' : 'shadow-none'
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CardBody className={`flex flex-row gap-4 items-center p-4`}>
        {showImage && (
          <div className="hidden sm:block w-32 h-32">
            <Image
              src={event?.banner || logo.src}
              alt={event?.name}
              removeWrapper
              radius="none"
              className="w-full h-full object-cover bg-gray-300 rounded-md"
            />
          </div>
        )}
        <div className="w-full flex flex-col gap-4">
          <section>
            <div className="flex flex-row gap-2 text-sm text-gray-400 items-center">
              {isMagistral && (
                <Chip
                  color="success"
                  variant="flat"
                  size="sm"
                >
                  P. Magistral
                </Chip>
              )}
              <span>
                {event?.date && formatDate(event?.date, 'DD/MM/YYYY')}
              </span>
              <span>
                {event?.timeStart} - {event?.timeEnd}
              </span>
            </div>
          </section>
          <div className="flex flex-col gap-2">
            <p className="text-xs text-gray-600 font-medium">
              {event?.summary?.topic?.name}
            </p>
            <Link
              href={`/eventos/${event?.id}`}
              target="_blank"
              className={`text-base lg:text-lg font-bold uppercase ${
                isHover
                  ? 'text-primary-800 underline cursor-pointer'
                  : 'text-gray-900'
              }`}
            >
              {event?.name}
            </Link>
            <h2 className="line-clamp-2 text-sm sm:text-base text-gray-600 dark:text-gray-500">
              {event?.shortDescription}
            </h2>
          </div>
          <div>
            <User
              avatarProps={{
                src: event?.summary?.person?.image || logo.src,
                alt: event?.summary?.person?.name,
              }}
              name={
                event?.summary?.person?.name +
                ' ' +
                event?.summary?.person?.surName
              }
              description={event?.summary?.person?.institution}
            />
          </div>
        </div>
      </CardBody>
      {/* <Divider className="sm:hidden" />
      <CardFooter className="bg-gray-200 justify-between p-4">
        <div className="flex items-center gap-6 text-sm sm:text-base">
          <div className="flex items-center gap-3">
            <IconCalendarEvent className="w-4 h-4" />
            <span>{event?.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <IconClockFilled className="w-4 h-4" />
            <span>
              {formatTime(event?.timeStart)} - {formatTime(event?.timeEnd)}
            </span>
          </div>
        </div>
        <Link
          href={`/eventos/${event?.id}`}
          target="_blank"
          className="flex items-center gap-2 px-4 text-xs sm:text-sm"
        >
          <p className="font-medium text-base">Leer más</p>
        </Link>
      </CardFooter> */}
    </Card>
  )
}
