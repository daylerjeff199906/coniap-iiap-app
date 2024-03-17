/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSearchParams } from 'next/navigation'
import { FrmEditEvent, TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useEvents } from '@/hooks/admin'
import { useEffect, useState } from 'react'

const columns: Array<IColumns> = [
  {
    key: 'name',
    label: 'Nombre',
    align: 'start',
  },
  {
    key: 'date',
    label: 'Fecha',
    align: 'start',
  },
  {
    key: 'timeStart',
    label: 'Hora de inicio',
    align: 'start',
  },
  {
    key: 'timeEnd',
    label: 'Hora de fin',
    align: 'start',
  },
  {
    key: 'status',
    label: 'Estado',
    align: 'center',
  },
  {
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]
export const ListEventsSection = () => {
  const { getEvents, events, loading, getEventById, event } = useEvents()

  const searchParams = useSearchParams()

  const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    getEvents()
  }, [])

  useEffect(() => {
    if (isEdit) {
      const id = searchParams.get('edit')
      if (id) {
        getEventById(id)
      }
    }
  }, [isEdit])

  return (
    <>
      <TableGeneral
        columns={columns}
        rows={
          events
            ? events.map((event) => {
                return {
                  key: event.id,
                  name: event.name,
                  date: event.date,
                  timeStart: event.timeStart,
                  timeEnd: event.timeEnd,
                  status: event.isActived ? 'Activo' : 'Inactivo',
                  actions: 'actions',
                }
              })
            : []
        }
      />
      {event && (
        <FrmEditEvent
          isOpen={isEdit}
          event={event}
        />
      )}
    </>
  )
}
