/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'
import { useEvents, useFiles } from '@/hooks/admin'

const columns: Array<IColumns> = [
  {
    key: 'name',
    label: 'Nombre',
    align: 'start',
  },
  {
    key: 'speaker',
    label: 'Expositor',
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
  const { getEvents, events, getEventById, event, loading } = useEvents()
  const { editField } = useFiles()
  const [query, setQuery] = useState('')

  const searchParams = useSearchParams()

  const isEdit = searchParams.get('edit') !== null

  useEffect(() => {
    getEvents(query)
  }, [query])

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        // Agregar verificación para event !== null
        const id = await searchParams.get('edit')
        if (id) {
          await getEventById(id)
        }
      } else {
        getEvents('')
      }
    }

    fetchData()
  }, [event, isEdit])

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'events', 'isActived', value)
    getEvents('')
  }

  return (
    <>
      <TableGeneral
        loading={loading}
        columns={columns}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
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
                  speaker:
                    event?.summary !== null
                      ? event?.summary?.person?.name +
                        ' ' +
                        event?.summary?.person?.surName
                      : '',
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}
