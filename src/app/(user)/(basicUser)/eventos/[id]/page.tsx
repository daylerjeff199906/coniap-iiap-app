/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { useEvents } from '@/hooks/client'
import { DetailsEvent } from '@/components'
interface IProps {
  params: {
    id: string
  }
}

interface ISection {
  htmlContent: string
}

export default function Page(props: IProps) {
  const { id } = props.params
  const { getEventById, event } = useEvents()

  useEffect(() => {
    getEventById(id)
  }, [id])

  return (
    <>
      {/* <h1>Page</h1>
      {event && event.customContent && (
        <DisplayHTMLContent htmlContent={event?.customContent} />
      )} */}
      {event && <DetailsEvent event={event} />}
    </>
  )
}

function DisplayHTMLContent({ htmlContent }: ISection) {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
}
