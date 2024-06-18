/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components/general'
import { IColumns, IEvent, IRows } from '@/types'

import { usePrograms } from '@/hooks/admin'
import { useFormContext } from 'react-hook-form'

const columns: IColumns[] = [
  {
    label: '#',
    key: 'key',
  },
  {
    label: 'Programa',
    key: 'title',
  },
  {
    label: 'Fecha',
    key: 'date',
  },
  {
    label: 'Estado',
    key: 'estado',
  },
]

interface IProps {
  onSetOpen: (value: boolean) => void
}

export const ListPrograms = (props: IProps) => {
  const { getPrograms, programs, loading } = usePrograms()
  const { setValue } = useFormContext<IEvent>()
  const { onSetOpen } = props

  const [query, setQuery] = useState('')

  useEffect(() => {
    getPrograms(query)
  }, [query])

  const onSelectionChange = (row: any) => {
    const full_name = row.key + ' - ' + row.title + ' - ' + row.date
    setValue('program.id', row.key)
    setValue('program_name', full_name)
    setValue('date', row.date)
    onSetOpen(false)
  }

  return (
    <>
      <section className="">
        <TableGeneral
          columns={columns}
          selectionMode="single"
          onSelectionChange={(row) => {
            onSelectionChange(row)
          }}
          loading={loading}
          onSearch={(value) => setQuery(value)}
          searchValue={query}
          rows={
            programs !== null
              ? programs?.map((program) => {
                  return {
                    key: program.id,
                    title: program.title,
                    date: program.date,
                    events: program.events?.length,
                    estado: program.isActived ? 'Activo' : 'Inactivo',
                  }
                })
              : []
          }
        />
      </section>
    </>
  )
}
