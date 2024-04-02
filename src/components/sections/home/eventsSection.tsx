'use client'
import { CardEvent } from '@/components'
import { IEvent } from '@/types'
import { motion } from 'framer-motion'

import Image from 'next/image'
import dividerShape from '@/assets/svg/wavesOpacityGray.svg'

interface IProps {
  events: IEvent[] | undefined
}

export const EventsSection = (props: IProps) => {
  const { events } = props
  return (
    <>
      <section className="bg-white section-shape w-full relative">
        <Image
          src={dividerShape}
          alt="divider"
          className="absolute z-10 top-0 left-0 w-full "
        />
        <div className="container space-y-6 py-4">
          <motion.header
            initial={{ opacity: 0, x: -15 }}
            viewport={{ once: false }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 1,
              },
            }}
          >
            <div className="flex items-center gap-3 pb-3">
              <div className="dot-custom" />
              <p className="text-xs font-semibold z-10">#eventos- 2024</p>
            </div>
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Próximos <b>eventos</b>
              </h2>
            </div>
          </motion.header>
          <div>
            {events &&
              events.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  viewport={{ once: false }}
                  whileInView={{
                    opacity: 1,
                    transition: {
                      duration: 1,
                    },
                  }}
                >
                  <CardEvent event={event} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
