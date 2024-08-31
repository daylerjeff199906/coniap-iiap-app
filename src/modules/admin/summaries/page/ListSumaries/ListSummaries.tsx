/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns, IRows } from '@/types'
import { useSummaries } from '@/hooks/admin'
import { useSearchParams } from 'next/navigation'
import { Chip, Spinner } from '@nextui-org/react'
import { FiltersSection } from './sections'
import { formatDate } from '@/utils/functions'
import { usePathname, useRouter } from 'next/navigation'
import { useFilterFromUrl } from '@/modules/core'

const columns: Array<IColumns> = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'created_at',
    label: 'Fecha de creación',
    align: 'start',
  },

  {
    key: 'title',
    label: 'Título',
    align: 'start',
  },
  {
    key: 'topic',
    label: 'Temática',
    align: 'start',
  },
  {
    key: 'person',
    label: 'Persona',
    align: 'start',
  },
  {
    key: 'summary',
    label: 'Adj. resumen',
    align: 'start',
  },
  {
    key: 'st_review',
    label: 'Estado de revisión',
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

export const ListSummaries = () => {
  const { getSummaries, summaries, loading } = useSummaries()
  const { updateFilters } = useFilterFromUrl()
  const pathname = usePathname()
  const router = useRouter()

  const [query, setQuery] = useState<string>('')
  const [idPerson, setIdPerson] = useState<string>('')

  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const aproved = searchParams.get('aproved')
  const date = searchParams.get('date')
  const topic = searchParams.get('topic')
  const isFile = searchParams.get('file')
  const page = searchParams.get('page')

  useEffect(() => {
    getSummaries({
      query,
      isPagination: true,
      isActived:
        status === 'active' ? true : status === 'inactived' ? false : undefined,
      isApproved:
        aproved === 'approved'
          ? true
          : aproved === 'pending'
          ? false
          : undefined,
      created_at: date || undefined,
      topic_id: topic || undefined,
      isFile: isFile === 'true' ? true : isFile === 'false' ? false : undefined,
      person_id: idPerson !== '' ? idPerson : undefined,
      params: { page: Number(page) || 1, limit: 30 },
    })
  }, [query, status, aproved, date, topic, isFile, page, idPerson])

  const rows: IRows[] =
    summaries !== null && summaries?.data?.length > 0
      ? summaries?.data?.map((summary) => {
          return {
            key: String(summary.id),
            id: summary.id,
            title: summary.title,
            created_at: formatDate(
              summary.created_at,
              'DD/MM/YYYY Hora: HH:mm'
            ),
            person: summary.person?.name + ' ' + summary.person?.surName,
            topic: summary.topic?.name || 'No tiene temática asignada',
            summary: summary.file ? 'Sí' : 'No',
            st_review: RenderColumnAproved(summary.isApproved),
            status: summary.isActived,
            actions: 'actions',
          }
        })
      : []

  const handleSelectedChange = (value: string) => {
    router.push(`${pathname}/${value}`)
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      }
    >
      <section></section>
      <TableGeneral
        placeholderSearch="Buscar por título de resumen"
        columns={columns}
        loading={loading}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        rows={rows}
        headerChildren={<FiltersSection onValueChange={setIdPerson} />}
        selectionMode="single"
        onSelectionChange={(row) => handleSelectedChange(row.key.toString())}
        count={summaries?.count}
        page={page ? Number(page) : 1}
        onPageChange={(page) => updateFilters({ page: page.toString() })}
      />
    </Suspense>
  )
}

const RenderColumnAproved = (value: boolean) => {
  return (
    <div className="flex flex-col">
      <Chip
        color={value ? 'success' : 'warning'}
        variant="flat"
        size="sm"
        radius="sm"
      >
        {value ? 'Aprobado' : 'Pendiente'}
      </Chip>
    </div>
  )
}
