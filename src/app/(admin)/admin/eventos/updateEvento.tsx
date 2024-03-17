/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSearchParams } from 'next/navigation'
import { FrmEditEvent } from '@/components'

import { useEvents } from '@/hooks/admin'
import { useEffect, useState } from 'react'
import { IEvent } from '@/types'

interface IProps {
  id: string
  isEdit: boolean
}

export const UpdateEvento = (props: IProps) => {
  const { id, isEdit } = props

  const { getEventById, event } = useEvents()

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        if (id) {
          await getEventById(id)
        }
      }
    }

    fetchData()
  }, [id, isEdit])

  return (
    <>
      {event !== null && (
        <FrmEditEvent
          //   isOpen={openModal}
          event={event}
        />
      )}
    </>
  )
}
