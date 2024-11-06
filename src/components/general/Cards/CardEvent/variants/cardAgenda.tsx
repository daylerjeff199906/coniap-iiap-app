'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import {
  Card,
  CardBody,
  Chip,
  Image,
  User,
  Link as NextLink,
} from '@nextui-org/react'
import Link from 'next/link'

import logo from '@/assets/images/logo_coniap_simple.webp'

function formatDate(date: string, format: string) {
  return format
    .replace(/YYYY/g, date.slice(0, 4))
    .replace(/MM/g, date.slice(5, 7))
    .replace(/DD/g, date.slice(8, 10))
}

interface IProps {
  event: IEvent
  showImage?: boolean
}

export const CardAgendaEvent = (props: IProps) => {
  const { event, showImage } = props
  const [isHover, setIsHover] = useState(false)

  const isMagistral =
    event?.summary?.person &&
    event?.summary?.person?.typePerson === 'speaker_mg'

  return (
    <Card
      className={`w-full bg-transparent transition-shadow duration-300 border-none ease-in-out ${
        isHover ? 'shadow-none' : 'shadow-none'
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CardBody className={`flex flex-row gap-4 items-center px-4`}>
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
            {event?.sala && (
              <NextLink
                href={event?.sala?.url || '#'}
                target="_blank"
                size="sm"
                showAnchorIcon
              >
                Ir a {event?.sala?.name}
              </NextLink>
            )}
          </div>
          <div>
            <User
              avatarProps={{
                src: event?.summary?.person?.image || logo.src,
                alt: event?.summary?.person?.name,
                className: `w-10 h-10 min-w-10 min-h-10 ${
                  !isMagistral && 'hidden'
                }`,
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
    </Card>
  )
}
