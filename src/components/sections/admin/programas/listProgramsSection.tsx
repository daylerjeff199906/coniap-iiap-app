/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { usePrograms, useFiles } from '@/hooks/admin'

const columns: Array<IColumns> = [
  {
    key: 'title',
    label: 'Título',
    align: 'start',
  },
  {
    key: 'date',
    label: 'Fecha',
    align: 'start',
  },
  {
    key: 'description',
    label: 'Detalles',
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

export const ListProgramsSection = () => {
  const { getPrograms, programs, loading, updateFieldDataProgram } =
    usePrograms()
  const { loading: updateLoading } = useFiles()
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    getPrograms(query)
  }, [query])

  const handleStatusChange = async (key: string, value: boolean) => {
    await updateFieldDataProgram(key, 'isActived', value ? 'TRUE' : 'FALSE')
    getPrograms('')
  }

  return (
    <>
      <TableGeneral
        loading={loading || updateLoading}
        columns={columns}
        onValueStatusChange={(key: string | number, value: boolean) => {
          handleStatusChange(String(key), value)
        }}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        rows={
          programs !== null
            ? programs?.map((program) => {
                return {
                  key: program.id,
                  title: program.title,
                  description: program.shortDescription,
                  date: program.date,
                  status: program.isActived,
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}
