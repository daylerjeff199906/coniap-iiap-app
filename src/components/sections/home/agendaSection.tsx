'use client'
import { CardEvent } from '@/components'
import { IEvent, IProgram } from '@/types'
import { Button, Tab, Tabs } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { formatDateToDDMMM } from '@/utils/functions'
import Link from 'next/link'

interface IProps {
  programs: IProgram[] | undefined
  events: IEvent[] | undefined
}

export const AgendaSection = (props: IProps) => {
  const { programs, events } = props
  return (
    <>
      <section className=" bg-white">
        <div className="container section-home grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          <motion.div
            className="w-ful col-span-1"
            initial={{ opacity: 0, x: -15 }}
            viewport={{
              once: false,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.4, // Animation duration
              },
            }}
          >
            <div className="flex items-center gap-3 pb-3">
              <div className="dot-custom" />
              <p className="text-xs font-semibold">#AGENDA - 2024</p>
            </div>
            <div className="pb-4">
              <h2 className="text-3xl sm:text-[40px] pb-6 leading-tight">
                Ponencias: <b>Destacadas</b> del congreso
              </h2>
              <h3 className="text-lg">
                Echa un vistazo a las principales ponencias del congreso que
                están por realizarse
              </h3>
            </div>
            <Button
              radius="full"
              size="lg"
              variant="ghost"
              color="danger"
              as={Link}
              href="/agenda"
            >
              Ver agenda
            </Button>
          </motion.div>
          <div className="w-ful col-span-1 sm:col-span-2">
            <Tabs
              aria-label="Options"
              variant="underlined"
              classNames={{
                panel: 'border-1',
                tabContent: 'group-data-[selected=true]:font-bold text-xl',
                tab: 'mb-2',
              }}
              size="lg"
            >
              {programs?.map((program, programIndex) => (
                <Tab
                  key={programIndex}
                  title={formatDateToDDMMM(program.date as string)}
                >
                  <div className="sm:p-4 lg:p-6">
                    {events
                      ?.filter((event) => event.program?.id === program.id) // Filtrar eventos por program_id
                      .slice(0, 7)
                      .map((filteredEvent, eventIndex) => (
                        <CardEvent
                          key={eventIndex}
                          event={filteredEvent}
                          variant="list"
                          showImage={false}
                        />
                      ))}
                  </div>
                </Tab>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </>
  )
}
