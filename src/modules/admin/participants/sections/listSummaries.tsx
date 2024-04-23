/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { usePersons, useFiles, useSummaries } from '@/hooks/admin'

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
  const { getSummaries, summaries, loading } = useSummaries()
  const { editField, loading: editLoading } = useFiles()
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    getSummaries(query)
  }, [query])

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
                  st_review: summary.isApproved ? 'Aprobado' : 'Pendiente',
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

const RenderColumnName = (fullname: string, surname: string) => {
  return (
    <div className="flex flex-col">
      <p className="text-base font-bold">{fullname}</p>
      <p className="text-xs font-medium text-slate-500">{surname}</p>
    </div>
  )
}
