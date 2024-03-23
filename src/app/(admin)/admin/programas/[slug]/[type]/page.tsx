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
      <h1>
        Programa {slug} - {type}
      </h1>
    </>
  )
}
