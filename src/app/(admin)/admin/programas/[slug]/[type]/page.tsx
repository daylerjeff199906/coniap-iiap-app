/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { usePrograms } from '@/hooks/admin'
import { useEffect } from 'react'
interface IProps {
  params: {
    slug: string
    type: string
  }
}

export default function Page(props: IProps) {
  const { slug, type } = props.params
  const { getProgramById, program, loading } = usePrograms()

  useEffect(() => {
    getProgramById(slug)
  }, [slug])

  return (
    <>
      <section>
        <h1 className="uppercase text-2xl font-bold">
          {type} - {program?.title}
        </h1>
        <h2 className="pb-2">{program?.shortDescription}</h2>
        <h3 className="text-gray-500 text-sm font-bold">
          Fecha: {program?.date} - {program?.events?.length} eventos
        </h3>
      </section>
    </>
  )
}
