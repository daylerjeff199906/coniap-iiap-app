/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { usePrograms, useFiles } from '@/hooks/admin'
import Link from 'next/link'

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
    key: 'events',
    label: 'Cant. de Eventos',
    align: 'start',
  },
  {
    key: 'status',
    label: 'Estado',
    align: 'center',
  },
  {
    key: 'addEvents',
    label: 'Add eventos',
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
        rows={
          programs !== null
            ? programs?.map((event) => {
                return {
                  key: event.id,
                  title: event.title,
                  date: event.date,
                  events: event.events?.length,
                  status: event.isActived,
                  addEvents: RenderColumAddEvents(event.id),
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}

const RenderColumAddEvents = (id: string) => {
  return (
    <>
      <Link
        href={`/admin/programas/${id}/eventos`}
        className="text-primary-500 hover:text-primary-300"
      >
        Agregar eventos
      </Link>
    </>
  )
}
