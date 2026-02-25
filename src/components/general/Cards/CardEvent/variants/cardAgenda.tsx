'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NextImage from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

import logo from '@/assets/images/logo_coniap_simple.webp'
import socialNetworks from '@/utils/json/social_networks.json'

function formatDate(date: string, format: string) {
  if (!date) return ''
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

  const socialNetworksLogo = socialNetworks.find(
    (item) => item?.id === event?.sala?.platform || ''
  )

  return (
    <Card
      className={`w-full bg-transparent transition-shadow duration-300 border-none shadow-none`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <CardContent className="flex flex-row gap-4 items-center px-4">
        {showImage && (
          <div className="hidden sm:block w-32 h-32 relative flex-shrink-0">
            <NextImage
              src={event?.banner || logo.src}
              alt={event?.name || 'evento'}
              fill
              className="object-cover bg-gray-300 rounded-md"
            />
          </div>
        )}
        <div className="w-full flex flex-col gap-4">
          <section>
            <div className="flex flex-row gap-2 text-sm text-gray-400 items-center">
              {isMagistral && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px]"
                >
                  P. Magistral
                </Badge>
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
              className={`text-base lg:text-lg font-bold uppercase transition-colors ${isHover
                  ? 'text-primary underline cursor-pointer'
                  : 'text-gray-900'
                }`}
            >
              {event?.name}
            </Link>
            <h2 className="line-clamp-2 text-sm sm:text-base text-gray-600 dark:text-gray-500">
              {event?.shortDescription}
            </h2>
            {event?.sala && (
              <Link
                href={event?.sala?.url || '#'}
                target="_blank"
                className="flex items-center gap-2 text-sm text-primary hover:underline"
              >
                {socialNetworksLogo?.logo && (
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <NextImage
                      src={socialNetworksLogo.logo}
                      alt="Sala"
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                Ir a {event?.sala?.name}
              </Link>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isMagistral && (
              <Avatar className="h-10 w-10">
                <AvatarImage src={event?.summary?.person?.image || logo.src} />
                <AvatarFallback>{event?.summary?.person?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {event?.summary?.person?.name + ' ' + event?.summary?.person?.surName}
              </span>
              <span className="text-xs text-muted-foreground">
                {event?.summary?.person?.institution}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
