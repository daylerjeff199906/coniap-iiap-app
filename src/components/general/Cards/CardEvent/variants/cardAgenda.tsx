'use client'
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

import logo from '@/assets/images/logo_coniap_simple.webp'
import { useState } from 'react'

interface IProps {
  event: IEvent
  showImage?: boolean
}

function formatTime(time: string) {
  return time.split(':').slice(0, 2).join(':')
}

export const CardAgendaEvent = (props: IProps) => {
  const { event, showImage } = props
  const [isHover, setIsHover] = useState(false)
  return (
    <Card
      shadow={isHover ? 'sm' : 'none'}
      className="border w-full bg-white"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CardBody className={`flex flex-row gap-4 items-center p-5 lg:p-6`}>
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
          <div>
            <Chip
              radius="full"
              color="primary"
              variant="flat"
              size="sm"
            >
              {event?.summary?.topic?.name}
            </Chip>
            <div>
              {event?.sala && (
                <Chip
                  className="bg-black text-white"
                  size="sm"
                >
                  {`Sala ${event?.sala}`}
                </Chip>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:gap-3">
            <Link
              href={`/eventos/${event?.id}`}
              target="_blank"
              className={`text-2xl lg:text-3xl font-medium ${
                isHover
                  ? 'text-primary-500 underline cursor-pointer'
                  : 'text-gray-700'
              }`}
            >
              {event?.name}
            </Link>
            <p className="line-clamp-2 text-sm text-gray-500">
              {event?.shortDescription}
            </p>
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
          {/* <Divider /> */}
        </div>
      </CardBody>
      <Divider className="sm:hidden" />
      <CardFooter className="bg-gray-200 justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <IconCalendarEvent size={20} />
            <span>{event?.date}</span>
          </div>
          <div className="flex items-center gap-3">
            <IconClockFilled size={20} />
            <span>
              {formatTime(event?.timeStart)} - {formatTime(event?.timeEnd)}
            </span>
          </div>
        </div>
        <Link
          href={`/agenda/${event?.id}`}
          className="flex items-center gap-2 px-4"
        >
          <p className="font-medium text-base">Leer más</p>
        </Link>
      </CardFooter>
    </Card>
  )
}
