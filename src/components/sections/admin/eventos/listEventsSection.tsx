/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSearchParams } from 'next/navigation'
import { FrmEditEvent, TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useEvents } from '@/hooks/admin'
import { useEffect, useState } from 'react'
import { IEvent } from '@/types'

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
  const [eventData, setEventData] = useState<IEvent | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const { getEvents, events, getEventById, event, editEventField } = useEvents()

  const searchParams = useSearchParams()

  const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    getEvents()
  }, [])

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
      } else {
        getEvents()
        setOpenModal(false)
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

  const handleStatusChange = async (key: string, value: boolean) => {
    await editEventField(key, 'isActived', value)
    getEvents()
  }

  return (
    <>
      <TableGeneral
        columns={columns}
        onValueStatusChange={(key: string | number, value: boolean) => {
          handleStatusChange(String(key), value)
        }}
        rows={
          events
            ? events.map((event) => {
                return {
                  key: event.id,
                  name: event.name,
                  date: event.date,
                  timeStart: event.timeStart,
                  timeEnd: event.timeEnd,
                  status: event.isActived,
                  actions: 'actions',
                }
              })
            : []
        }
      />
      {/* {eventData && (
        <FrmEditEvent
          isOpen={openModal}
          event={eventData}
        />
      )} */}
    </>
  )
}
