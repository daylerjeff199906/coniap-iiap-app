/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect } from 'react'
import { TableGeneral } from '@/components'
import { HeaderSection, useFilterFromUrl } from '@/modules/core'
import { FiltersSection } from './sections'
import { convertDate } from '@/utils/functions'
import { ExportExcel, getTypePerson } from '@/modules/admin'
import { usePathname } from 'next/navigation'

import { usePersons } from '@/hooks/admin'
import { columns, actions } from './columns'

export const ListParticipants = () => {
  const { getParams, updateFilter } = useFilterFromUrl()
  const { getPersons, loading, persons } = usePersons()
  const pathname = usePathname()

  const routes = {
    '/admin/participantes': {
      type: getParams('typePerson', ''),
      subtitle:
        'Lista general de participantes (Incluye ponentes, ponentes magistrales y asistentes)',
      title: 'Participantes',
      href: '/admin/participantes/nuevo',
      isNot: undefined,
    },
    '/admin/participantes/ponentes': {
      type: getParams('typePerson', ''),
      subtitle: 'Lista de ponentes (Ponentes magistrales y ponentes)',
      title: 'Ponentes',
      isNot: 'participant',
      href: '/admin/participantes/ponentes/nuevo',
    },
    '/admin/participantes/asistentes': {
      type: 'participant',
      subtitle: 'Lista solo de participantes al congreso',
      title: 'Asistentes',
      isNot: undefined,
      href: '/admin/participantes/asistentes/nuevo',
    },
  }

  const { type, isNot, subtitle, title } =
    routes[pathname as keyof typeof routes] || {}
  const query = getParams('query', '')
  const statusPerson = getParams('status', '')
  const statusValue =
    statusPerson === 'active'
      ? 'TRUE'
      : statusPerson === 'inactive'
      ? 'FALSE'
      : ''

  useEffect(() => {
    getPersons(query, type, isNot, statusValue)
  }, [query, type, isNot, statusValue])

  const handleQuery = (value: string) => updateFilter('query', value)

  const listPerson =
    persons?.map((speaker) => ({
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
    })) || []

  const dataExcel = persons && persons.length > 0 ? persons : []

  return (
    <>
      <HeaderSection
        title={title}
        subtitle={subtitle}
        isButtonVisible
        labelButton="Agregar"
        href="/admin/participantes/nuevo"
        rigthContent={<ExportExcel dataList={dataExcel} />}
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
