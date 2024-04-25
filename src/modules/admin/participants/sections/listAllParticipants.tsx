/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { usePersons, useFiles } from '@/hooks/admin'

const columns: Array<IColumns> = [
  {
    key: 'level',
    label: 'Tipo de participante',
    align: 'start',
  },
  {
    key: 'name',
    label: 'Participante',
    align: 'start',
  },
  {
    key: 'job',
    label: 'Puesto de trabajo',
    align: 'start',
  },
  {
    key: 'institution',
    label: 'Institución',
    align: 'start',
  },
  {
    key: 'status',
    label: 'Estado',
    align: 'center',
  },
]
export const ListParticipants = () => {
  const { getPersons, persons, loading } = usePersons()
  const { editField, loading: editLoading } = useFiles()
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    getPersons(query)
  }, [query])

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'persons', 'isActived', value)
    getPersons('')
  }

  return (
    <>
      <TableGeneral
        loading={loading || editLoading}
        columns={columns}
        onValueStatusChange={(key: string | number, value: boolean) => {
          handleStatusChange(String(key), value)
        }}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        rows={
          persons !== null
            ? persons?.map((speaker) => {
                return {
                  key: speaker.id,
                  name: RenderColumnName(speaker.name, speaker.surName),
                  job: speaker.job,
                  institution: speaker.institution,
                  level: speaker.typePerson,
                  status: speaker.isActived,
                  actions: 'actions',
                }
              })
            : []
        }
      />
    </>
  )
}

const RenderColumnName = (fullname: string, surname: string) => {
  return (
    <div className="flex flex-col">
      <p className="text-base font-bold">{fullname}</p>
      <p className="text-xs font-medium text-slate-500">{surname}</p>
    </div>
  )
}
