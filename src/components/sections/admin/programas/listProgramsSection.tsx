/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useSearchParams } from 'next/navigation'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { usePrograms } from '@/hooks/admin'
import { useEffect, useState } from 'react'

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
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]
export const ListProgramsSection = () => {
  const { getPrograms, programs, loading } = usePrograms()

  useEffect(() => {
    getPrograms()
  }, [])

  return (
    <>
      <TableGeneral
        loading={loading}
        columns={columns}
        // onValueStatusChange={(key: string | number, value: boolean) => {
        //   handleStatusChange(String(key), value)
        // }}
        rows={
          programs
            ? programs.map((event) => {
                return {
                  key: event.id,
                  title: event.title,
                  date: event.date,
                  events: event.events?.length,
                  status: event.isActived,
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}
