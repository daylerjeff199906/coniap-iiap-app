import { IEvent } from '@/types'
import { formatDateLarge } from '@/utils/functions'
import { Divider, Image } from '@nextui-org/react'
import {
  IconCalendarEvent,
  IconClockHour12,
  IconArrowNarrowRight,
} from '@tabler/icons-react'
import Link from 'next/link'

interface EventCardProps {
  variant?: 'gallery' | 'list' | 'agenda'
  data: IEvent
}

export const EventCard = (props: EventCardProps) => {
  const { variant = 'list', data } = props

  return (
    <>
      {variant === 'list' && (
        <main className="grid grid-cols-1 sm:grid-cols-6  bg-transparent hover:cursor-pointer rounded-md gap-4 sm:gap-6 items-center ">
          <section className="col-span-1 sm:col-span-2">
            <Image
              src={data.banner || '/banner_coniap_simple.webp'}
              alt={data.name}
              width={260}
              height={260}
              removeWrapper
              className="rounded-md w-full h-full object-cover bg-gray-300 min-h-28"
            />
          </section>
          <section className="col-span-1  sm:col-span-4 flex flex-col gap-4">
            <header>
              <Link
                href={`/eventos/${data.id}`}
                className="font-bold text-2xl uppercase hover:underline"
              >
                {data.name}
              </Link>
            </header>
            <section>
              <p className="line-clamp-2 text-sm text-gray-500">
                {data?.shortDescription}
              </p>
            </section>
            <Divider />
            <footer className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="text-xs font-bold flex gap-3 w-full justify-between sm:justify-start">
                <div className="flex gap-2 items-center">
                  <IconCalendarEvent size={28} />
                  {data.date && <h2>{formatDateLarge(data?.date)}</h2>}
                </div>
                <div className="flex gap-2 items-center">
                  <IconClockHour12 size={28} />
                  <h3>
                    Desde las {data.timeStart} a {data.timeEnd}
                  </h3>
                </div>
              </div>
              <div className="flex justify-center sm:justify-end w-full bg-primary-700 sm:bg-transparent text-white rounded-md sm:text-gray-500 p-2 sm:px-4">
                <Link
                  href={`/eventos/${data.id}`}
                  className="text-sm flex gap-2 "
                >
                  Ver más
                  <IconArrowNarrowRight
                    size={24}
                    stroke={1.5}
                    className="sm:text-gray-500"
                  />
                </Link>
              </div>
            </footer>
          </section>
        </main>
      )}
      {variant === 'agenda' && <></>}
      {variant === 'gallery' && <></>}
    </>
  )
}
