/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components/general'
import { IColumns, IRows } from '@/types'

import { usePrograms } from '@/hooks/admin'
import { useFormContext } from 'react-hook-form'

const columns: IColumns[] = [
  {
    label: '#',
    key: 'key',
  },
  {
    label: 'Programa',
    key: 'name',
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
  const { setValue } = useFormContext()
  const { onSetOpen } = props

  const [query, setQuery] = useState('')

  useEffect(() => {
    getPrograms(query)
  }, [query])

  const onSelectionChange = (row: IRows) => {
    setValue('program_id', row.key)
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
                    key: String(program.id),
                    name: program.title,
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
