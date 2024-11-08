/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'
import { useEvents } from '@/hooks/admin'
import { useFilterFromUrl } from '@/modules/core'
import { useDebounce } from '@/hooks/core'
import { FiltersSection } from '../../reports/pages/EventsReports/FiltersSection'

const columns: Array<IColumns> = [
  {
    key: 'id',
    label: 'ID',
    align: 'start',
  },
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
    key: 'speaker-type',
    label: 'T. Persona',
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
  const { getParams } = useFilterFromUrl()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const debouncedQuery = useDebounce(query, 500)

  const isEdit = getParams('edit', '')

  useEffect(() => {
    getEvents({
      query: debouncedQuery,
      isPagination: true,
      limit: 30,
      page: page,
    })
  }, [debouncedQuery, page])

  useEffect(() => {
    const fetchData = async () => {
      if (isEdit) {
        // Agregar verificación para event !== null
        const id = await getParams('id', '')
        if (id) {
          await getEventById(id)
        }
      } else {
        getEvents({})
      }
    }

    fetchData()
  }, [event, isEdit])

  return (
    <>
      <TableGeneral
        loading={loading}
        columns={columns}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        onPageChange={(page) => setPage(page)}
        page={page}
        count={events?.count}
        headerChildren={
          <FiltersSection
            onChageFilter={() => {}}
            onClearFilter={() => {}}
          />
        }
        rows={
          events?.event
            ? events.event.map((event) => {
                return {
                  key: event.id,
                  id: event.id,
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
                      : 'No tiene expositor',
                  'speaker-type': event?.summary?.person
                    ? event?.summary?.person?.typePerson
                    : 'N/A',
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}
