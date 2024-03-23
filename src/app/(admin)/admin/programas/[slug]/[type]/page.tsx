/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import {
  CalendarSection,
  FrmAddEventInProgram,
  LoadingPages,
} from '@/components'
import { useLogicEventToProgram } from '@/providers'
interface IProps {
  params: {
    slug: string
    type: string
  }
}

export default function Page(props: IProps) {
  const { slug, type } = props.params
  const { getProgramById, program, loading } = useLogicEventToProgram()

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
      <section className="grid grid-cols-2 gap-6">
        <CalendarSection />
        <FrmAddEventInProgram
          program={program}
          idProgram={slug}
        />
      </section>
      <LoadingPages isOpen={loading} />
    </>
  )
}
