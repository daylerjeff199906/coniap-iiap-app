/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useEvents } from '@/hooks/admin'
import { useEffect } from 'react'

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
  const { getEvents, events, loading } = useEvents()

  useEffect(() => {
    getEvents()
  }, [])

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
    </>
  )
}
