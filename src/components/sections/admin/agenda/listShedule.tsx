'use client'

import { DataNotFound, CardEvent } from '@/components'
import { IEvent, IProgram } from '@/types'
import { Divider, Tab, Tabs } from '@nextui-org/react'

interface IProps {
  programs: IProgram[]
  events: IEvent[]
}
export const ListShedule = (props: IProps) => {
  const { programs, events } = props
  return (
    <>
      <section className="py-12 flex flex-col items-center w-full">
        <Tabs
          aria-label="Tabs agenda"
          // classNames={{
          //   tab: 'font-bold',
          // }}
          color="primary"
        >
          {programs?.map((program, index) => (
            <Tab
              key={index}
              title={program.date}
              className="w-full "
            >
              <main className="p-4 w-full">
                <header className="p-4 w-full flex flex-col items-center">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {program.title}
                  </h1>
                  <p className="text-gray-500">{program.shortDescription}</p>
                </header>
                <section className="w-full py-2 space-y-3">
                  <div className="">
                    <h1 className="font-semibold">Eventos del día</h1>
                    <Divider />
                  </div>
                  {events.length > 0 ? (
                    <>
                      {events
                        ?.filter((event) => event.program_id === program.id) // Filtrar eventos por program_id
                        .slice(0, 7)
                        .map((filteredEvent, eventIndex) => (
                          <CardEvent
                            key={eventIndex}
                            event={filteredEvent}
                            variant="agenda"
                          />
                        ))}
                    </>
                  ) : (
                    <>
                      <DataNotFound />
                    </>
                  )}
                </section>
              </main>
            </Tab>
          ))}
        </Tabs>
      </section>
      <aside></aside>
    </>
  )
}
