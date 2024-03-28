'use client'
import { IEvent, IProgram } from '@/types'
import { Button, Tab, Tabs } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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

  console.log('programs', programs)
  console.log('events', events)

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
            >
              Ver agenda
            </Button>
          </div>
          <div className="w-ful col-span-1 sm:col-span-2">
            <Tabs
              aria-label="Options"
              variant="underlined"
            >
              {programs?.map((program, programIndex) => (
                <Tab
                  key={programIndex}
                  title={program?.date}
                >
                  <div>
                    {events
                      ?.filter((event) => event.program_id === program.id) // Filtrar eventos por program_id
                      .map((filteredEvent, eventIndex) => (
                        <CardListEvent
                          key={eventIndex}
                          events={filteredEvent}
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

const CardListEvent = ({ events }: { events: IEvent }) => {
  return (
    <div className="p-4">
      <p>{events?.date}</p>
      <p className="text-lg font-bold underline">{events?.name}</p>
      <p>{events?.date}</p>
    </div>
  )
}
