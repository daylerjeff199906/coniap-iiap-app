'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NextImage from 'next/image'
import { Badge } from '@/components/ui/badge'
import { IconClockHour12 } from '@tabler/icons-react'
import logo from '@/assets/images/logo_coniap_simple.webp'
import socialNetworks from '@/utils/json/social_networks.json'
import Link from 'next/link'

interface IProps {
  event: IEvent
  showImage?: boolean
}

export const CardListEvent = (props: IProps) => {
  const { event, showImage } = props
  const [isHover, setIsHover] = useState(false)

  const isMagistral = event?.summary?.person?.typePerson === 'speaker_mg'
  const socialNetworksLogo = socialNetworks.find(
    (item) => item?.id === event?.sala?.platform || ''
  )

  const isPassHour = new Date().getTime() > new Date(event.timeStart).getTime()

  return (
    <Link
      className="border-none w-full min-w-full block"
      href={`/eventos/${event.id}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        {showImage && (
          <div className="w-full sm:w-40 h-32 relative flex-shrink-0">
            <NextImage
              src={event?.banner || logo.src}
              alt={event?.name || 'evento'}
              fill
              className="object-cover bg-gray-300 rounded-md"
            />
          </div>
        )}
        <div className="w-full">
          <section className="w-full">
            <header className="text-xs text-gray-500 flex flex-wrap gap-x-4 gap-y-2 pb-2 items-center">
              {isMagistral && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px] rounded-full"
                >
                  Magistral
                </Badge>
              )}
              <div
                className={`flex gap-2 items-center ${isHover ? 'text-primary font-medium' : 'text-gray-500'
                  } ${isPassHour && 'text-gray-400 line-through'}`}
              >
                <IconClockHour12 size={14} />
                <h3 className="text-xs">
                  Desde las {event.timeStart} a {event.timeEnd}
                </h3>
              </div>
              {event?.sala && (
                <div onClick={(e) => e.stopPropagation()}>
                  <Link
                    href={event?.sala?.url || '#'}
                    target="_blank"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    {socialNetworksLogo?.logo && (
                      <div className="relative w-4 h-4 flex-shrink-0">
                        <NextImage
                          src={socialNetworksLogo.logo}
                          alt="Sala"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <p className="text-[10px] sm:text-xs">Ir a {event?.sala?.name}</p>
                  </Link>
                </div>
              )}
            </header>
            <main className="pb-2 w-full">
              <h1
                className={`mb-1 transition-colors ${isMagistral ? 'text-lg' : 'text-base'
                  } font-bold ${isHover ? 'text-primary underline' : 'text-gray-700'
                  }`}
              >
                {event.name}
              </h1>
              <p className="text-xs text-muted-foreground line-clamp-2">{event.shortDescription}</p>
            </main>
            {event?.summary?.person && (
              <section className="w-full pt-2">
                <div className="flex items-center gap-3">
                  {isMagistral && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={event?.summary?.person?.image || ''} alt={event?.summary?.person?.name} />
                      <AvatarFallback>{event?.summary?.person?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold">
                      {event?.summary?.person?.name + ' ' + event?.summary?.person?.surName || 'Nombre de ponente'}
                    </span>
                    <span className="text-[10px] text-muted-foreground line-clamp-1">
                      {event?.summary?.person?.institution || 'Institucion'}
                    </span>
                  </div>
                </div>
              </section>
            )}
          </section>
        </div>
      </div>
    </Link>
  )
}
