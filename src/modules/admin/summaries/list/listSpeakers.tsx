/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components/general'
import { IColumns, IRows } from '@/types'

import { usePersons } from '@/hooks/admin'
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
  const [page, setPage] = useState(1)

  useEffect(() => {
    getPersons({
      query,
      isNot: 'participant',
      params: {
        limit: 20,
        page,
      },
    })
  }, [query, page])

  const onSelectionChange = (row: IRows) => {
    setValue('person_id', row.key)
    onSelectedSpeaker(row)
  }

  const handleSearch = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  const rows: IRows[] =
    persons !== null && persons.data.length > 0
      ? persons?.data.map((person) => {
          return {
            key: String(person?.id),
            name: person?.name + ' ' + person?.surName,
            typePerson:
              person?.typePerson === 'speaker'
                ? 'Ponente'
                : 'Ponente magistral',
            estado: person?.isActived ? 'Activo' : 'Inactivo',
          }
        })
      : []

  return (
    <section className="">
      <TableGeneral
        columns={columns}
        selectionMode="single"
        onSelectionChange={(row) => {
          onSelectionChange(row)
        }}
        loading={loading}
        onSearch={handleSearch}
        onPageChange={(page) => setPage(page)}
        page={page}
        count={persons?.count || 0}
        searchValue={query}
        rows={rows}
        disableWrapper
      />
    </section>
  )
}
