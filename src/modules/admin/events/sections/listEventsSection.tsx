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
  const { getEvents, events, loading } = useEvents()
  const { getParams } = useFilterFromUrl()
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const debouncedQuery = useDebounce(query, 500)

  //filters from url
  const status = getParams('status', 'all')
  const file = getParams('file', 'all')
  const topic = getParams('topic', 'all')
  const isMagistral = getParams('magistral', 'all')

  function refreshData() {
    getEvents({
      query: debouncedQuery,
      isActived: status === 'all' ? undefined : status === 'true',
      isSumary: file === 'all' ? undefined : file === 'true' ? 'true' : 'false',
      topic: topic === 'all' ? undefined : Number(topic),
      isMagistral: isMagistral === 'all' ? undefined : isMagistral === 'true',
      isPagination: true,
      limit: 30,
      page: page,
    })
  }

  useEffect(() => {
    refreshData()
  }, [debouncedQuery, page])

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
            onChageFilter={refreshData}
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
