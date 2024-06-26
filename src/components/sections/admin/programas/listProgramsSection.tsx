/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IActions, IColumns } from '@/types'

import { usePrograms, useFiles } from '@/hooks/admin'
import { useFilterFromUrl } from '@/modules/core'
import { DialogStatus } from '@/modules/admin'

const columns: Array<IColumns> = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
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

const actions: Array<IActions> = [
  {
    label: 'Cambiar estado',
    key: 'status',
    href: '?id=',
  },
]

export const ListProgramsSection = () => {
  const { getPrograms, programs, loading, updateFieldDataProgram } =
    usePrograms()
  const { getParams } = useFilterFromUrl()

  const { loading: updateLoading } = useFiles()
  const [query, setQuery] = useState<string>('')

  const id = getParams('id', '')
  const status = getParams('status', '')

  useEffect(() => {
    getPrograms(query)
  }, [query, id])

  const rows =
    programs !== null
      ? programs.map((program) => {
          return {
            key: program.id,
            id: program.id,
            title: program.title,
            description: program.shortDescription,
            date: program.date,
            status: program.isActived,
            actions: 'actions',
          }
        })
      : []

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TableGeneral
          loading={loading || updateLoading}
          columns={columns}
          onSearch={(value) => setQuery(value)}
          searchValue={query}
          rows={rows}
          actionsList={actions}
        />
      </Suspense>
      <DialogStatus
        isOpen={id !== ''}
        id={id}
        status={status === 'true'}
      />
    </>
  )
}
