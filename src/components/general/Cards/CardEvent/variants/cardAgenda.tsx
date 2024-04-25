'use client'
import { IEvent } from '@/types'
import {
  Button,
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

interface IProps {
  event: IEvent
}

function formatTime(time: string) {
  return time.split(':').slice(0, 2).join(':')
}

export const CardAgendaEvent = (props: IProps) => {
  const { event } = props
  return (
    <>
      <Card
        shadow="none"
        className="lg:border"
      >
        <CardBody className="px-0 sm:p-6 lg:p-8  grid grid-cols-1 sm:grid-cols-12 gap-6">
          <div className="hidden sm:block sm:col-span-3">
            <Image
              src={event?.banner || logo.src}
              alt={event?.name}
              removeWrapper
              radius="none"
              className="w-full h-full object-cover bg-gray-300"
            />
          </div>
          <div className="sm:col-span-9 grid grid-cols-1 gap-4">
            <div>
              <h2 className="text-lg pb-1">{formatTime(event?.timeStart)}</h2>
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
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold">{event?.name}</h1>
              <p className="hidden">{event?.shortDescription}</p>
            </div>
            <div>
              <User
                name={
                  event?.summary?.person?.name +
                  ' ' +
                  event?.summary?.person?.surName
                }
                description={event?.summary?.person?.institution}
              />
            </div>
            <Divider />
            <div className="sm:flex justify-between gap-4">
              <div className="sm:flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <IconCalendarEvent size={20} />
                  <span>{event?.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <IconClockFilled size={20} />
                  <span>
                    {formatTime(event?.timeStart)} -{' '}
                    {formatTime(event?.timeEnd)}
                  </span>
                </div>
              </div>
              <Link
                href={`/eventos/${event?.id}`}
                className="hidden sm:block"
              >
                <p className="font-medium text-base">Leer más</p>
              </Link>
            </div>
          </div>
        </CardBody>
        <Divider className="sm:hidden" />
        <CardFooter className="px-0 sm:hidden">
          <Link href={`/agenda/${event?.id}`}>
            <p className="font-medium text-base">Leer más</p>
          </Link>
        </CardFooter>
      </Card>
    </>
  )
}
