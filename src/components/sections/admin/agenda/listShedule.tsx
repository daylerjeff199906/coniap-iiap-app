'use client'

import { DataNotFound, CardEvent } from '@/components'
import { IProgram } from '@/types'
import { Divider, Tab, Tabs } from '@nextui-org/react'

interface IProps {
  programs: IProgram[]
}
export const ListShedule = (props: IProps) => {
  const { programs } = props
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
                  {program?.events.length > 0 ? (
                    <>
                      {program.events.map((event, index) => (
                        <CardEvent
                          key={index}
                          event={event}
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
