/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useFiles, useSummaries } from '@/hooks/admin'
import { useSearchParams } from 'next/navigation'
import { Chip } from '@nextui-org/react'

const columns: Array<IColumns> = [
  {
    key: 'title',
    label: 'Título',
    align: 'start',
  },
  {
    key: 'created_at',
    label: 'Fecha de creación',
    align: 'start',
  },
  {
    key: 'person',
    label: 'Persona',
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
  const { getSummaries, getSummariesStatus, summaries, loading } =
    useSummaries()
  const { editField, loading: editLoading } = useFiles()
  const [query, setQuery] = useState<string>('')

  const searchParams = useSearchParams()
  const status = searchParams.get('status') || 'all'

  useEffect(() => {
    switch (status) {
      case 'all':
        getSummaries('')
        break
      case 'approved':
        getSummariesStatus('', true)
        break
      case 'pending':
        getSummariesStatus('', false)
        break
      default:
        getSummaries('')
        break
    }
  }, [query, status])

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'summaries', 'isActived', value)
    getSummaries('')
  }

  return (
    <>
      <TableGeneral
        loading={loading || editLoading}
        columns={columns}
        onValueStatusChange={(key: string | number, value: boolean) => {
          handleStatusChange(String(key), value)
        }}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        rows={
          summaries !== null
            ? summaries?.map((summary) => {
                return {
                  key: summary.id,
                  title: summary.title,
                  created_at: summary.created_at,
                  person:
                    summary.person_id.name + ' ' + summary.person_id.surName,
                  st_review: RenderColumnAproved(summary.isApproved),
                  status: summary.isActived,
                  actions: 'actions',
                }
              })
            : []
        }
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
      >
        {value ? 'Aprobado' : 'Pendiente'}
      </Chip>
    </div>
  )
}
