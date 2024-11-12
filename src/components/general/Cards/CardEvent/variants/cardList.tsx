'use client'
import { useState } from 'react'
import { IEvent } from '@/types'
import { Chip, Image, User, Link as NextLink } from '@nextui-org/react'
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

  return (
    <Link
      className="border-none w-full min-w-full"
      href={`/eventos/${event.id}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        {showImage && (
          <div className="w-40">
            <Image
              src={event?.banner || logo.src}
              alt={event?.name}
              removeWrapper
              radius="none"
              className="w-full h-full object-cover bg-gray-300"
            />
          </div>
        )}
        <div className="w-full">
          <section className="w-full ">
            <header className="text-xs text-gray-500 flex gap-2 pb-2">
              {isMagistral && (
                <Chip
                  color="success"
                  size="sm"
                  radius="full"
                  variant="flat"
                >
                  Magistral
                </Chip>
              )}
              <div
                className={`flex gap-2 items-center ${
                  isHover ? 'text-primary-800 font-medium' : 'text-gray-500'
                }`}
              >
                <IconClockHour12 size={14} />
                <h3>
                  Desde las {event.timeStart} a {event.timeEnd}
                </h3>
              </div>
              {event?.sala && (
                <NextLink
                  href={event?.sala?.url || '#'}
                  target="_blank"
                  size="sm"
                  showAnchorIcon
                  className="flex items-center gap-2"
                >
                  <Image
                    src={socialNetworksLogo?.logo}
                    alt="Sala"
                    width={20}
                    className="mr-2 flex-shrink-0"
                  />
                  Ir a {event?.sala?.name}
                </NextLink>
              )}
            </header>
            <main className="pb-2 w-full">
              <h1
                className={`mb-1 ${
                  isMagistral ? 'text-lg' : 'text-base'
                } font-bold ${
                  isHover ? 'text-primary-800 underline' : 'text-gray-700'
                }`}
              >
                {event.name}
              </h1>
              <p className="text-xs">{event.shortDescription}</p>
            </main>
            {event?.summary?.person && (
              <section className="w-full pt-3">
                <User
                  avatarProps={{
                    src: event?.summary?.person?.image || '',
                    alt: event?.summary?.person?.name || 'Nombre de ponente',
                    className: `w-10 h-10 min-w-10 min-h-10 ${
                      !isMagistral && 'hidden'
                    }`,
                  }}
                  name={
                    event?.summary?.person?.name +
                      ' ' +
                      event?.summary?.person?.surName || 'Nombre de ponente'
                  }
                  description={
                    event?.summary?.person?.institution || 'Institucion'
                  }
                />
              </section>
            )}
          </section>
        </div>
      </div>
    </Link>
  )
}
