'use client'
import { Suspense } from 'react'
import { TableGeneral } from '@/components'
import { columns } from './columns'
import { FiltersSection } from './FilterSection'
import { HeaderSection } from '@/modules/core'
import { formatDate } from '@/utils/functions'
import { useFilterFromUrl } from '@/modules/core'
import { useRouter } from 'next/navigation'
import { useSummaries } from '@/hooks/admin'
import { ExportSummariesExcel } from './ExportSummariesExcel'

export const SummariesReports = () => {
  const { getSummaries, summaries, loading, setSummaries } = useSummaries()
  const { getParams } = useFilterFromUrl()
  const router = useRouter()

  const status = getParams('status', '')
  const aproved = getParams('aproved', '')
  const file = getParams('file', '')
  const topic = getParams('topic', '')

  const listSummaries =
    (summaries &&
      summaries?.data?.length > 0 &&
      summaries?.data.map((summary) => ({
        key: String(summary?.id),
        id: summary?.id,
        created_at: formatDate(summary?.created_at, 'DD/MM/YYYY Hora: HH:mm'),
        title: summary?.title.toUpperCase(),
        topic: summary?.topic?.name.toUpperCase(),
        name: summary?.person?.name.toUpperCase(),
        surname: summary?.person?.surName.toUpperCase(),
        email: summary?.person?.email,
        phone: summary?.person?.phone || 'No registrado',
        institution: summary?.person?.institution,
        coauthors: summary?.authors,
        status: summary?.isApproved ? 'Activo' : 'Inactivo',
        isAprroved: summary?.isApproved ? 'Sí' : 'No',
      }))) ||
    []

  const dataExcel =
    summaries && summaries?.data?.length > 0 ? summaries?.data : []

  const handleGetPersons = () => {
    getSummaries({
      query: '',
      isActived:
        status === 'active' ? true : status === 'inactive' ? false : undefined,
      isApproved:
        aproved === 'approved'
          ? true
          : aproved === 'pending'
          ? false
          : undefined,
      isFile: file === 'true' ? true : file === 'false' ? false : undefined,
      topic_id: topic || undefined,
    })
  }

  const handleClearFilter = () => {
    router.push('/admin/reportes/summaries')
    setSummaries(null)
  }

  return (
    <main className="flex flex-col gap-4">
      <HeaderSection
        title="Reportes de resumen"
        subtitle="Realiza un seguimiento de los resumenes subidos en el congreso hasta la fecha"
        rigthContent={<ExportSummariesExcel dataList={dataExcel} />}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <TableGeneral
          columns={columns}
          rows={listSummaries}
          selectionMode="single"
          headerChildren={
            <FiltersSection
              onChageFilter={handleGetPersons}
              onClearFilter={handleClearFilter}
            />
          }
          count={summaries?.count}
          loading={loading}
          disableInputSearch
          disablePagination
        />
      </Suspense>
    </main>
  )
}
