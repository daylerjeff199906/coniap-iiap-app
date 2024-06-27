/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IActions, IColumns } from '@/types'

import { usePrograms, useFiles } from '@/hooks/admin'
import { useFilterFromUrl } from '@/modules/core'
import { FilterSection } from './filterSection'

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
    href: 'status',
  },
]

export const ListPrograms = () => {
  const { getPrograms, programs, loading } = usePrograms()
  const { getParams } = useFilterFromUrl()

  const { loading: updateLoading } = useFiles()
  const [query, setQuery] = useState<string>('')

  const date = getParams('date', '')

  useEffect(() => {
    getPrograms(query, undefined, date)
  }, [query, date])

  const rows =
    programs && programs.length > 0
      ? programs?.map((program) => {
          return {
            key: program?.id,
            id: program?.id,
            title: program?.title,
            description: program?.shortDescription,
            date: program?.date,
            status: program?.isActived,
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
          headerChildren={<FilterSection />}
        />
      </Suspense>
    </>
  )
}
