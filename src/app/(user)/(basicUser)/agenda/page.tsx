/* eslint-disable react-hooks/exhaustive-deps */
import { OtherEventsSection, DataNotFound } from '@/components'
import { IEvent, IProgram } from '@/types'
import { ListShedule } from '@/modules/user'
import { fetchEvents, fetchProgramsFilter } from '@/api'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Agenda',
  description:
    'Descubre la agenda del III Congreso Internacional sobre Amazonía Peruana 2024',
}
interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function Page(props: Props) {
  const { searchParams } = props
  const { program } = searchParams as {
    program: string
  }

  let otherEvents: IEvent[] = []
  let eventSpeakers: { event: IEvent[]; count: number } = {
    event: [],
    count: 0,
  }
  let programs: { programs: IProgram[]; count: number } = {
    programs: [],
    count: 0,
  }

  // Get programs list
  try {
    const data = await fetchProgramsFilter({
      query: '',
      orderBy: {
        column: 'date',
        ascending: true,
      },
    })

    if (data) {
      programs = {
        programs: data.programs as unknown as IProgram[],
        count: Number(data.count),
      }
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  // Get other events
  try {
    const data = await fetchEvents({
      page: 1,
      limit: 10,
      isSumary: 'false',
    })

    if (data) {
      otherEvents = data.event
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  // Get event speakers
  try {
    const data = await fetchEvents({
      isSumary: 'true',
      programId: Number(program) || Number(programs.programs[0]?.id),
      orderBy: {
        column: 'timeStart',
        ascending: true,
      },
    })

    if (data) {
      eventSpeakers = { event: data.event, count: Number(data.count) }
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }

  return (
    <>
      <main className="w-full bg-gray-50">
        <section className="container ">
          {programs?.programs && programs?.programs?.length > 0 ? (
            <ListShedule
              programs={programs.programs}
              events={eventSpeakers.event}
            />
          ) : (
            <DataNotFound />
          )}
        </section>
      </main>
      <OtherEventsSection events={otherEvents} />
    </>
  )
}
