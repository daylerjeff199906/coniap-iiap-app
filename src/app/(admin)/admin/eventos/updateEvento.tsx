/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSearchParams } from 'next/navigation'
import { FrmEditEvent } from '@/components'

import { useEvents } from '@/hooks/admin'
import { useEffect, useState } from 'react'
import { IEvent } from '@/types'

export const UpdateEvento = () => {
  const [eventData, setEventData] = useState<IEvent | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const { getEventById, event } = useEvents()

  const searchParams = useSearchParams()

  const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        // Agregar verificación para event !== null
        const id = await searchParams.get('edit')
        if (id) {
          await getEventById(id)
          if (event) {
            setOpenModal(true)
          }
        }
      }
    }

    fetchData()
  }, [event, isEdit])

  useEffect(() => {
    if (event && openModal) {
      setEventData(event)
    } else {
      setEventData(null)
    }
  }, [openModal])

  return (
    <>
      {eventData && (
        <FrmEditEvent
          //   isOpen={openModal}
          event={eventData}
        />
      )}
    </>
  )
}
