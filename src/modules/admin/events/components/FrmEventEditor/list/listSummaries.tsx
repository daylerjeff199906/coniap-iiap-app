/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components/general'
import { IColumns, IEvent } from '@/types'

import { useSummaries } from '@/hooks/admin'
import { useFormContext } from 'react-hook-form'

const columns: IColumns[] = [
  {
    label: '#',
    key: 'key',
  },
  {
    label: 'Ponente',
    key: 'fullname',
  },
  {
    label: 'Tema de resumen',
    key: 'summary',
  },
  {
    label: 'Categoria',
    key: 'topic',
  },
]

interface IProps {
  onSetOpen: (value: boolean) => void
}

export const ListSummaries = (props: IProps) => {
  const { getSummaries, summaries, loading } = useSummaries()
  const { setValue } = useFormContext<IEvent>()
  const { onSetOpen } = props

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    getSummaries({
      query,
      isActived: true,
      isPagination: true,
      params: {
        page,
        limit: 29,
      },
    })
  }, [query, page])

  const onSelectionChange = (row: any) => {
    setValue('summary.id', row?.key)
    setValue('summary_name', row?.fullname)
    setValue('name', row?.summary)
    onSetOpen(false)
  }

  const rows =
    summaries?.data?.map((summary) => {
      return {
        key: String(summary.id),
        fullname: summary?.person?.name + ' ' + summary?.person?.surName,
        summary: summary.title,
        topic: summary.topic?.name,
      }
    }) || []

  return (
    <TableGeneral
      columns={columns}
      selectionMode="single"
      onSelectionChange={(row) => {
        onSelectionChange(row)
      }}
      loading={loading}
      onSearch={(value) => {
        setQuery(value)
        setPage(1)
      }}
      searchValue={query}
      rows={rows}
      count={summaries?.count || 0}
      page={page}
      onPageChange={(page) => setPage(page)}
      disableWrapper
    />
  )
}
