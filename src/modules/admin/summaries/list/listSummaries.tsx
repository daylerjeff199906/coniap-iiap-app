/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components/general'
import { IColumns, IRows } from '@/types'

import { useSummaries } from '@/hooks/admin'
import { useFormContext } from 'react-hook-form'
import { Chip } from '@nextui-org/react'

const columns: Array<IColumns> = [
  {
    key: 'key',
    label: 'id',
    align: 'start',
  },
  {
    key: 'title',
    label: 'Título',
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
]

interface IProps {
  onSetOpen: (value: boolean) => void
}

export const ListSummaries = (props: IProps) => {
  const { getSummariesStatus, summaries, loading } = useSummaries()
  const { setValue } = useFormContext()
  const { onSetOpen } = props

  const [query, setQuery] = useState('')

  useEffect(() => {
    getSummariesStatus(query, true)
  }, [query])

  const onSelectionChange = (row: IRows) => {
    setValue('summary_id', row.key)
    setValue('name', row.title)
    onSetOpen(false)
  }

  return (
    <>
      <section className="">
        <TableGeneral
          loading={loading}
          columns={columns}
          onSearch={(value) => setQuery(value)}
          onSelectionChange={onSelectionChange}
          searchValue={query}
          selectionMode="single"
          rows={
            summaries !== null
              ? summaries?.map((summary) => {
                  return {
                    key: String(summary.id),
                    title: summary.title,
                    created_at: summary.created_at,
                    person:
                      summary?.person !== null && summary?.person !== undefined
                        ? summary.person.name + summary.person.surName
                        : '',
                    st_review: RenderColumnAproved(summary.isApproved),
                    status: summary.isActived,
                    actions: 'actions',
                  }
                })
              : []
          }
        />
      </section>
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
