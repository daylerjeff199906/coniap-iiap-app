/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense } from 'react'
import { TableGeneral } from '@/components'
import { IActions, IColumns, IPerson } from '@/types'
import { useFilterFromUrl } from '@/modules/core'
import { FiltersSection } from './sections'

const columns: Array<IColumns> = [
  {
    key: 'id',
    label: 'ID',
    align: 'center',
  },
  {
    key: 'date',
    label: 'Fecha de registro',
    align: 'start',
  },
  {
    key: 'level',
    label: 'Tipo de participante',
    align: 'start',
  },
  {
    key: 'name',
    label: 'Nombres',
    align: 'start',
  },
  {
    key: 'surname',
    label: 'Apellidos',
    align: 'start',
  },
  {
    key: 'email',
    label: 'Email',
    align: 'start',
  },
  {
    key: 'phone',
    label: 'Teléfono',
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

interface IProps {
  dataList: IPerson[]
}
const actions: Array<IActions> = [
  {
    label: 'Cambiar estado',
    key: 'status',
    href: 'status',
  },
]
export const ListParticipants = (prop: IProps) => {
  const { dataList } = prop
  const { getParams, updateFilter } = useFilterFromUrl()

  const query = getParams('query', '')

  const handleQuery = (value: string) => {
    updateFilter('query', value)
  }

  const persons =
    dataList && dataList.length > 0
      ? dataList?.map((speaker) => {
          return {
            key: String(speaker?.id),
            id: speaker?.id,
            date: speaker?.created_at,
            name: speaker?.name,
            surname: speaker?.surName,
            email: speaker?.email,
            phone: speaker?.phone || 'No registrado',
            institution: speaker?.institution,
            level: speaker?.typePerson,
            status: speaker?.isActived,
            actions: 'actions',
          }
        })
      : []

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <TableGeneral
          columns={columns}
          onSearch={handleQuery}
          searchValue={query}
          rows={persons}
          headerChildren={<FiltersSection />}
          actionsList={actions}
        />
      </Suspense>
    </>
  )
}
