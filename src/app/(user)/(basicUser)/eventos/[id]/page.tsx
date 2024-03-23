/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect } from 'react'
import { useEvents } from '@/hooks/client'
import { DetailsEvent } from '@/components'
interface IProps {
  params: {
    id: string
  }
}

export default function Page(props: IProps) {
  const { id } = props.params
  const { getEventById, event } = useEvents()

  useEffect(() => {
    getEventById(id)
  }, [id])

  return <>{event && <DetailsEvent event={event} />}</>
}
