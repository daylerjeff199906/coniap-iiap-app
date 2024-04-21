/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components/general'
import { IColumns, IProgram, IRows } from '@/types'

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

export const ListPrograms = () => {
  const { getPrograms, programs, loading } = usePrograms()
  const { control, setValue } = useFormContext()

  const [query, setQuery] = useState('')

  useEffect(() => {
    getPrograms(query)
  }, [query])

  const onSelectionChange = (row: IRows) => {
    setValue('program_id', row.key)
    setValue('date', row.date)
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
          rows={
            programs !== null
              ? programs?.map((program) => {
                  return {
                    key: program.id,
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
