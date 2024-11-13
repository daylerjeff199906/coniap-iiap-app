'use client'
import { DataNotFound, CardEvent } from '@/components'
import { IEvent, IProgram } from '@/types'
// import { Button, Divider } from '@nextui-org/react'
// import { IconPrinter } from '@tabler/icons-react'
// import Link from 'next/link'

import { useFilterFromUrl } from '@/modules/core'
import { ListSheduleGroup } from './list-shedule-group'

interface IProps {
  programs: IProgram[]
  events: IEvent[]
}
export const ListShedule = (props: IProps) => {
  const { programs, events } = props
  const { updateFilters, getParams } = useFilterFromUrl()

  const programSelected = getParams('program', `${programs[0]?.id}`)
  const program = programs.find(
    (program) => program.id.toString() === programSelected
  )

  const getFormattedDate = (dateString: string) => {
    const date = new Date(dateString)
    date.setDate(date.getDate() + 1) // Add one day
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      timeZone: 'America/Lima',
    }
    const formattedDate = new Intl.DateTimeFormat('es-ES', options).format(date)
    const [day, month, year] = formattedDate.split(' ')
    const nameDay = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
    }).format(date)

    return {
      nameDay: nameDay,
      day: day,
      month: month,
      year: year,
      date: `${day} ${month} ${year}`,
    }
  }

  const handleSelectTab = (programId: string) => {
    const programInitial = programs[0]?.id
    if (programInitial.toString() !== programId) {
      updateFilters({ program: programId })
    } else {
      updateFilters({ program: '' })
    }
  }

  return (
    <>
      <section className="w-full">
        <header
          id="section-tabs"
          className="relative w-full"
        >
          <div className="flex justify-center space-x-4">
            {programs?.map((program, index) => {
              const isSelected = program.id.toString() === programSelected
              return (
                <div
                  key={index}
                  className="flex items-center relative flex-col gap-2 cursor-pointer"
                  onClick={() => handleSelectTab(program.id.toString())}
                >
                  <section className="flex flex-col items-center gap-1">
                    <p className="text-sm text-gray-500 font-medium uppercase text-center">
                      {getFormattedDate(program.date).nameDay}
                    </p>
                    <h1
                      className={`text-2xl sm:text-3xl lg:text-4xl font-bold capitalize ${
                        isSelected ? 'text-primary-500' : 'text-gray-700'
                      }`}
                    >
                      {getFormattedDate(program.date).day}{' '}
                      {getFormattedDate(program.date).month}
                    </h1>
                  </section>

                  <div
                    className={`absolute -bottom-3 z-10 left-0 right-0 h-1 bg-primary-500 ${
                      isSelected ? 'w-full' : 'w-0'
                    }`}
                  />
                </div>
              )
            })}
          </div>

          <div className="absolute z-0 -bottom-3 left-0 right-0 w-full h-0.5 bg-gray-300" />
        </header>
        {program && (
          <footer
            id="title-section"
            className="py-6 lg:p-8 flex flex-col items-center gap-1 sm:gap-2 w-full"
          >
            <h1 className="text-2xl sm:text-3xl font-bold">{program?.title}</h1>
            <p className="text-gray-500 text-center text-sm sm:text-base">
              {program?.shortDescription}
            </p>
          </footer>
        )}
      </section>
      <ListSheduleGroup data={events} />
    </>
  )
}
