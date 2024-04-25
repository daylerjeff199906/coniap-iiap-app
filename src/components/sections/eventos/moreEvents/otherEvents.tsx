'use client'
import { CardEvent } from '@/components'
import { IEvent } from '@/types'

interface IProps {
  events: IEvent[] | undefined
}

export const OtherEventsSection = (props: IProps) => {
  const { events } = props
  return (
    <>
      <section className="bg-gray-50 rounded-lg section-home w-full">
        <div className="container space-y-6">
          <header>
            <div className="flex items-center gap-3 pb-3">
              <div className="dot-custom" />
              <p className="text-xs font-semibold">#eventos- 2024</p>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Otros <b>eventos</b>
              </h2>
            </div>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {events &&
              events.map((event, i) => (
                <CardEvent
                  key={i}
                  event={event}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
