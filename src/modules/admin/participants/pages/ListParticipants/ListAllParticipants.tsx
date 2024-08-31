/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Suspense, useEffect } from 'react'
import { HeaderSection, useFilterFromUrl } from '@/modules/core'
import { ExportExcel, getTypePerson } from '@/modules/admin'
import { FiltersSection, TypesSearch } from './sections'
import { formatDate } from '@/utils/functions'
import { Selection } from '@nextui-org/react'
import { usePathname, useRouter } from 'next/navigation'
import { columns, actions } from './columns'
import { TableGeneral } from '@/components'
import { usePersons } from '@/hooks/admin'

export const ListParticipants = () => {
  const limit = 30
  const { getParams, updateFilter } = useFilterFromUrl()
  const { getPersons, loading, persons } = usePersons()
  const pathname = usePathname()
  const router = useRouter()

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
  const typeSearch = getParams('qtype', 'name')
  const page = getParams('page', '1')

  useEffect(() => {
    getPersons({
      column: typeSearch,
      isPagination: true,
      query,
      isNot,
      status: statusValue,
      typePerson: type,
      params: {
        limit,
        page: Number(page),
      },
    })
  }, [query, type, isNot, statusValue, page])

  const handleQuery = (value: string) => updateFilter('query', value)

  const listPerson =
    (persons &&
      persons?.data?.length > 0 &&
      persons?.data.map((speaker) => ({
        key: String(speaker?.id),
        id: speaker?.id,
        date: formatDate(speaker?.created_at, 'DD/MM/YYYY Hora: HH:mm'),
        name: speaker?.name,
        surname: speaker?.surName,
        email: speaker?.email,
        phone: speaker?.phone || 'No registrado',
        institution: speaker?.institution,
        level: getTypePerson(speaker?.typePerson),
        status: speaker?.isActived,
        actions: 'actions',
      }))) ||
    []

  const dataExcel = persons && persons?.data?.length > 0 ? persons?.data : []

  //To type search
  const handleTypeSearch = (val: Selection) => {
    const value = Object.values(val)[0]
    if (value === 'name') {
      updateFilter('qtype', '')
    } else {
      updateFilter('qtype', value)
    }
  }

  const handlePageChange = (page: number) => {
    updateFilter('page', String(page))
  }

  const handleChangeSelect = (value: string) => {
    router.push(`${pathname}/${value}`)
  }

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
          actionsList={actions}
          loading={loading}
          selectionMode="single"
          headerChildren={<FiltersSection />}
          endInputSection={
            <TypesSearch
              selectedKey={typeSearch === 'name' ? ['name'] : [typeSearch]}
              onSelectionChange={handleTypeSearch}
            />
          }
          count={persons?.count}
          page={Number(page)}
          onPageChange={handlePageChange}
          onSelectionChange={(row) => handleChangeSelect(row.key.toString())}
        />
      </Suspense>
    </>
  )
}
