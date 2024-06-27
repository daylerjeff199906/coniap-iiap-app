/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns, IRows } from '@/types'
import { useSummaries } from '@/hooks/admin'
import { useSearchParams } from 'next/navigation'
import { Chip } from '@nextui-org/react'
import { FiltersSection } from './sections'

const columns: Array<IColumns> = [
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
    key: 'created_at',
    label: 'Fecha de creación',
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

const actionsList = [
  { label: 'Ver', href: '' },
  { label: 'Editar', href: 'edit/' },
]

export const ListSummaries = () => {
  const { getSummaries, summaries, loading } = useSummaries()
  const [query, setQuery] = useState<string>('')

  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const aproved = searchParams.get('aproved')

  useEffect(() => {
    getSummaries(query, {
      isActived:
        status === 'active' ? true : status === 'inactived' ? false : undefined,
      isApproved:
        aproved === 'approved'
          ? true
          : aproved === 'pending'
          ? false
          : undefined,
    })
  }, [query, status, aproved])

  const rows: IRows[] =
    summaries !== null
      ? summaries?.map((summary) => {
          return {
            key: String(summary.id),
            title: summary.title,
            created_at: summary.created_at,
            person: summary.person?.name + ' ' + summary.person?.surName,
            topic: summary.topic?.name || 'No tiene temática asignada',
            st_review: RenderColumnAproved(summary.isApproved),
            status: summary.isActived,
            actions: 'actions',
          }
        })
      : []

  return (
    <>
      <TableGeneral
        columns={columns}
        loading={loading}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        rows={rows}
        headerChildren={<FiltersSection />}
      />
    </>
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
