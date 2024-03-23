/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { CalendarSection, FrmAddEventInProgram } from '@/components'
import { usePrograms } from '@/hooks/admin'
import { Button } from '@nextui-org/react'
import { EventToProgramProvider } from '@/providers'
interface IProps {
  params: {
    slug: string
    type: string
  }
}

export default function Page(props: IProps) {
  const { slug, type } = props.params
  const { getProgramById, program, loading } = usePrograms()

  const [isOpen, setOpen] = useState<boolean>(false)

  useEffect(() => {
    getProgramById(slug)
  }, [slug])

  return (
    <>
      <section className="pb-4">
        <h1 className="uppercase text-2xl font-bold">
          {type} - {program?.title}
        </h1>
        <h2 className="pb-2">{program?.shortDescription}</h2>
        <h3 className="text-gray-500 text-sm font-bold">
          Fecha: {program?.date} - {program?.events?.length} eventos
        </h3>
      </section>
      <EventToProgramProvider>
        <section className="grid grid-cols-2 gap-6">
          <CalendarSection />
          <FrmAddEventInProgram program={program} />
        </section>
      </EventToProgramProvider>
    </>
  )
}
