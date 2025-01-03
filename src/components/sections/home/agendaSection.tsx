'use client'
import { CardEvent } from '@/components'
import { IEvent, IProgram } from '@/types'
import { Button, Tab, Tabs } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { formatDateToDDMMM } from '@/utils/functions'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
  programs: IProgram[]
  events: IEvent[]
}

export const AgendaSection = (props: IProps) => {
  const { programs, events } = props

  return (
    <section className=" bg-white">
      <div className="container section-home grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
        <motion.div
          className="w-ful col-span-1 sticky top-20 z-20 h-fit bg-white"
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
              Echa un vistazo a las principales ponencias del congreso que están
              por realizarse
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
          {programs && programs?.length > 0 && (
            <Tabs
              aria-label="Options"
              variant="underlined"
              classNames={{
                panel: 'border-1 border-gray-200 rounded-md p-4',
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
                  <div className="sm:p-4 lg:p-6 rounded-md flex flex-col gap-2 ">
                    {events
                      ?.filter(
                        (event) =>
                          event.program?.id.toString() === program.id.toString()
                      ) // Filtrar eventos por program_id
                      .slice(0, 4)
                      .map((filteredEvent, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="border-b mb-2 pb-4"
                        >
                          <CardEvent
                            event={filteredEvent}
                            variant="list"
                            showImage={false}
                          />
                        </div>
                      ))}
                  </div>
                </Tab>
              ))}
            </Tabs>
          )}
          {programs && programs?.length === 0 && (
            <main className="w-full flex flex-col items-center justify-center">
              <Image
                src="/svg/not-agenda.svg"
                alt="No hay eventos programados"
                width={280}
                height={280}
              />
              <h3 className="text-sm text-center font-bold">
                No hay eventos programados
              </h3>
            </main>
          )}
        </div>
      </div>
    </section>
  )
}
