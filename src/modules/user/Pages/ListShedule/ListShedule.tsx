'use client'
import { DataNotFound, CardEvent } from '@/components'
import { IEvent, IProgram } from '@/types'
import { formatDateToDDMMM } from '@/utils/functions'
import { Button, Divider, Tab, Tabs } from '@nextui-org/react'
import { IconPrinter } from '@tabler/icons-react'
import Link from 'next/link'

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
          color="primary"
          variant="light"
          classNames={{
            tabContent:
              'group-data-[selected=true]:font-bold text-xl rounded-none',
            tab: 'bg-transparent border-none p-6',
          }}
        >
          {programs?.map((program, index) => (
            <Tab
              key={index}
              title={formatDateToDDMMM(program.date)}
              className="w-full"
            >
              <main className="sm:p-4 w-full">
                <header className="p-4 w-full flex flex-col items-center">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                    {program.title}
                  </h1>
                  <p className="text-gray-500">{program.shortDescription}</p>
                </header>
                <section className="w-full py-2 space-y-5">
                  <div className="">
                    <div className="flex gap-3 justify-between items-center py-3">
                      <h1 className="font-medium text-lg">Eventos del día</h1>
                      <Button
                        variant="light"
                        endContent={<IconPrinter />}
                        as={Link}
                        href="/"
                        target="_blank"
                      >
                        Descargar agenda
                      </Button>
                    </div>
                    <Divider />
                  </div>
                  {events?.length > 0 ? (
                    <>
                      <div className="w-full grid grid-cols-1 gap-8 lg:p-6">
                        {events
                          ?.filter((event) => event.program?.id === program.id) // Filtrar eventos por program_id
                          .slice(0, 7)
                          .map((filteredEvent, eventIndex) => (
                            <CardEvent
                              key={eventIndex}
                              event={filteredEvent}
                              variant="agenda"
                            />
                          ))}
                      </div>
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
