'use client'
import { CardEvent } from '@/components'
import { IEvent, IProgram } from '@/types'
import { Button, Tab, Tabs } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { formatDateToDDMMM } from '@/utils/functions'
import Link from 'next/link'

interface IProps {
  programs: IProgram[] | undefined
  events: IEvent[] | undefined
}

export const AgendaSection = (props: IProps) => {
  const { programs, events } = props

  const [ref, inView] = useInView({
    triggerOnce: false, // La animación solo se activará una vez
    threshold: 0.3, // Porcentaje de visibilidad del elemento en el viewport para activar la animación
  })

  return (
    <>
      <section
        className=" bg-white"
        ref={ref}
      >
        <div className="container section-home grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5">
          <div className="w-ful col-span-1">
            <motion.div
              className="flex items-center gap-3 pb-3"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}} // Animación cuando el elemento está en el viewport
              transition={{ duration: 0.5 }}
            >
              <div className="dot-custom" />
              <p className="text-xs font-semibold">#AGENDA - 2024</p>
            </motion.div>
            <div className="pb-4">
              <motion.h2
                className="text-3xl sm:text-[40px] pb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}} // Animación cuando el elemento está en el viewport
                transition={{ duration: 0.5 }}
              >
                Ponencias: <b>Destacadas</b> del congreso
              </motion.h2>
              <motion.h3
                className="text-lg"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}} // Animación cuando el elemento está en el viewport
                transition={{ duration: 0.5 }}
              >
                Echa un vistazo a las principales ponencias del congreso que
                están por realizarse
              </motion.h3>
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
          </div>
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
                      ?.filter((event) => event.program_id === program.id) // Filtrar eventos por program_id
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
