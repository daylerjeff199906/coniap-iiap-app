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
    key: 'name',
    label: 'Ponente',
  },
  {
    label: 'T. Participante',
    key: 'typePerson',
  },
  {
    label: 'Estado',
    key: 'estado',
  },
]

interface IProps {
  onSelectedSpeaker: (row: IRows) => void
}

export const ListSpeakers = (props: IProps) => {
  const { getPersons, persons, loading } = usePersons()
  const { setValue } = useFormContext()
  const { onSelectedSpeaker } = props

  const [query, setQuery] = useState('')

  useEffect(() => {
    getPersons(query, '', 'participant')
  }, [query])

  const onSelectionChange = (row: IRows) => {
    setValue('person_id', row.key)
    onSelectedSpeaker(row)
  }

  const rows: IRows[] =
    persons !== null
      ? persons?.map((person) => {
          return {
            key: String(person?.id),
            name: person?.name + ' ' + person?.surName,
            typePerson: person?.typePerson,
            estado: person?.isActived ? 'Activo' : 'Inactivo',
          }
        })
      : []

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
          rows={rows}
        />
      </section>
    </>
  )
}
