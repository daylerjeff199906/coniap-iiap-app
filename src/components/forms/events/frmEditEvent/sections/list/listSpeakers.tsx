/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components/general'
import { IColumns, IRows } from '@/types'

import { usePersons, usePrograms } from '@/hooks/admin'
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

export const ListSpeakers = (props: IProps) => {
  const { getPersons, persons, loading } = usePersons()
  const { setValue } = useFormContext()
  const { onSetOpen } = props

  const [query, setQuery] = useState('')

  useEffect(() => {
    getPersons(query)
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
            persons !== null
              ? persons?.map((person) => {
                  return {
                    key: person.id,
                    fullname: person.name + ' ' + person.surName,
                    typePerson: person.typePerson,
                    estado: person.isActived ? 'Activo' : 'Inactivo',
                  }
                })
              : []
          }
        />
      </section>
    </>
  )
}
