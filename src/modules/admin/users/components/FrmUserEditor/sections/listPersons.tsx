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
    label: 'Nombres',
  },
  { key: 'surName', label: 'Apellidos' },
  {
    label: 'T. Persona',
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

export const ListPersons = (props: IProps) => {
  const { getPersons, persons, loading } = usePersons()
  const { setValue } = useFormContext()
  const { onSelectedSpeaker } = props

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    getPersons({
      column: 'name',
      isPagination: true,
      query,
      params: {
        limit: 20,
        page: 1,
      },
    })
  }, [query])

  const onSelectionChange = (row: IRows) => {
    setValue('person_id', row.key)
    onSelectedSpeaker(row)
  }

  const rows: IRows[] =
    persons !== null && persons.data.length > 0
      ? persons.data?.map((person) => {
          return {
            key: String(person?.id),
            name: person?.name,
            surName: person?.surName,
            typePerson:
              person?.typePerson === 'speaker'
                ? 'Ponente'
                : person?.typePerson === 'participant'
                ? 'Participante'
                : 'Ponente magistral',
            estado: person?.isActived ? 'Activo' : 'Inactivo',
          }
        })
      : []

  const handleSearch = (value: string) => {
    setQuery(value)
    setPage(1)
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
          onSearch={handleSearch}
          searchValue={query}
          rows={rows}
          disableWrapper
          count={persons?.count || 0}
          page={page}
          onPageChange={(page) => setPage(page)}
        />
      </section>
    </>
  )
}
