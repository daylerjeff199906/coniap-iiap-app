/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { TableGeneral } from '@/components'
import { IColumns } from '@/types'

import { useSpeakers, useFiles } from '@/hooks/admin'

const columns: Array<IColumns> = [
  {
    key: 'level',
    label: 'Tipo de ponente',
    align: 'start',
  },
  {
    key: 'name',
    label: 'Ponente',
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
  {
    key: 'actions',
    label: 'Acciones',
    align: 'center',
  },
]
export const ListSpeakersSection = () => {
  const { getSpekers, speakers, loading } = useSpeakers()
  const { editField, loading: editLoading } = useFiles()
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    getSpekers(query)
  }, [query])

  const handleStatusChange = async (key: string, value: boolean) => {
    await editField(key, 'persons', 'isActived', value)
    getSpekers('')
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
          speakers !== null
            ? speakers?.map((speaker) => {
                return {
                  key: String(speaker?.id),
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
