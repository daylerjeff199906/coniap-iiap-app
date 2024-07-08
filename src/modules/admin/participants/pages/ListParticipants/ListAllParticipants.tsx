/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect } from 'react'
import { TableGeneral } from '@/components'
import { IActions, IColumns, IPerson } from '@/types'
import { HeaderSection, useFilterFromUrl } from '@/modules/core'
import { FiltersSection } from './sections'
import { convertDate } from '@/utils/functions'
import { ExportExcel, getTypePerson } from '@/modules/admin'

import { usePersons } from '@/hooks/admin'

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

const actions: Array<IActions> = [
  {
    label: 'Cambiar estado',
    key: 'status',
    href: 'status',
  },
]
export const ListParticipants = () => {
  const { getParams, updateFilter } = useFilterFromUrl()
  const { getPersons, loading, persons } = usePersons()

  const query = getParams('query', '')
  const type = getParams('typePerson', '')
  const statusPerson = getParams('status', '')
  const statusValue =
    statusPerson === 'active'
      ? 'TRUE'
      : statusPerson === 'inactive'
      ? 'FALSE'
      : ''

  useEffect(() => {
    getPersons(query, type, undefined, statusValue)
  }, [query, type, statusValue])

  const handleQuery = (value: string) => {
    updateFilter('query', value)
  }

  const listPerson =
    persons && persons.length > 0
      ? persons?.map((speaker) => {
          return {
            key: String(speaker?.id),
            id: speaker?.id,
            date: convertDate(speaker?.created_at),
            name: speaker?.name,
            surname: speaker?.surName,
            email: speaker?.email,
            phone: speaker?.phone || 'No registrado',
            institution: speaker?.institution,
            level: getTypePerson(speaker?.typePerson),
            status: speaker?.isActived,
            actions: 'actions',
          }
        })
      : []

  return (
    <>
      <HeaderSection
        title="Participantes"
        subtitle="Lista de participantes incluyendo ponentes, ponentes magistrales y asistentes"
        isButtonVisible
        labelButton="Agregar Participante"
        href="/admin/participantes/nuevo"
        rigthContent={
          <ExportExcel
            dataList={persons && persons.length > 0 ? persons : []}
          />
        }
      />
      <Suspense fallback={<div>Loading...</div>}>
        <TableGeneral
          columns={columns}
          onSearch={handleQuery}
          searchValue={query}
          rows={listPerson}
          headerChildren={<FiltersSection />}
          actionsList={actions}
          loading={loading}
        />
      </Suspense>
    </>
  )
}
