'use client'
import { Suspense } from 'react'
import { TableGeneral } from '@/components'
import { columns } from './columns'
import { FiltersSection } from './FiltersSection'
import { HeaderSection } from '@/modules/core'
import { formatDate } from '@/utils/functions'
import { useFilterFromUrl } from '@/modules/core'
import { useRouter } from 'next/navigation'
import { useEvents } from '@/hooks/admin'
import { ExportEventsExcel } from './ExportEventsExcel'

export const EventsReports = () => {
  const { getEvents, events, loading, setEvents } = useEvents()
  const { getParams } = useFilterFromUrl()
  const router = useRouter()

  const status = getParams('status', '')
  const file = getParams('file', '')
  const topic = getParams('topic', '')

  const listEvents =
    (events &&
      events?.event?.length > 0 &&
      events?.event?.map((event) => ({
        key: String(event?.id),
        id: event?.id,
        created_at: formatDate(
          event?.created_at.toString(),
          'DD/MM/YYYY Hora: HH:mm'
        ),
        name: event?.name.toUpperCase(),
        topic: event?.summary?.topic?.name.toUpperCase(),
        date: event?.date,
        start_time: event?.timeStart,
        end_time: event?.timeEnd,
        person_name: event?.summary?.person?.name.toUpperCase(),
        person_surname: event?.summary?.person?.surName.toUpperCase(),
        sala: event?.sala?.name.toUpperCase(),
        email: event?.summary?.person?.email,
        institution: event?.summary?.person?.institution,
        status: event?.isActived,
      }))) ||
    []

  const dataExcel = events && events?.event?.length > 0 ? events?.event : []

  const handleGetPersons = () => {
    getEvents({
      query: '',
      isActived:
        status === 'active' ? true : status === 'inactive' ? false : undefined,
      isSumary: file || undefined,
      topic: topic ? Number(topic) : undefined,
    })
  }

  const handleClearFilter = () => {
    router.push('/admin/reportes/summaries')
    setEvents(null)
  }

  return (
    <main className="flex flex-col gap-4">
      <HeaderSection
        title="Reportes de resumen"
        subtitle="Realiza un seguimiento de los resumenes subidos en el congreso hasta la fecha"
        rigthContent={<ExportEventsExcel dataList={dataExcel} />}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <TableGeneral
          columns={columns}
          rows={listEvents}
          selectionMode="single"
          headerChildren={
            <FiltersSection
              onChageFilter={handleGetPersons}
              onClearFilter={handleClearFilter}
            />
          }
          count={events?.count}
          loading={loading}
          disableInputSearch
          disablePagination
        />
      </Suspense>
    </main>
  )
}
