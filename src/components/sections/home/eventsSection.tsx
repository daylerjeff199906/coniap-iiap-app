'use client'
import { CardEvent } from '@/components'
import { IEvent } from '@/types'
// import { motion } from 'framer-motion'
import { Button, Card, CardBody, CardFooter, Image } from '@nextui-org/react'

interface IProps {
  events: IEvent[] | undefined
}

export const EventsSection = (props: IProps) => {
  const { events } = props
  return (
    <>
      <section className="bg-white section-home w-full">
        <div className="container space-y-6">
          <header>
            <div className="flex items-center gap-3 pb-3">
              <div className="dot-custom" />
              <p className="text-xs font-semibold">#eventos- 2024</p>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Próximos <b>eventos</b>
              </h2>
            </div>
          </header>
          <div>
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
