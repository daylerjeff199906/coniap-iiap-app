'use client'
import { Suspense } from 'react'
import { TableGeneral } from '@/components'
import { columns } from './columns'
import { FiltersSection } from './FilterSection'
import { HeaderSection } from '@/modules/core'
import { ExportExcel, getTypePerson } from '@/modules/admin'
import { usePersons } from '@/hooks/admin'
import { formatDate } from '@/utils/functions'
import { useFilterFromUrl } from '@/modules/core'
import { useRouter } from 'next/navigation'

export const ParticipantsReports = () => {
  const { getPersons, persons, loading, setPersons } = usePersons()
  const { getParams } = useFilterFromUrl()
  const router = useRouter()

  const typePerson = getParams('typePerson', '')
  const statusPerson = getParams('status', '')
  const status =
    statusPerson === 'active'
      ? 'TRUE'
      : statusPerson === 'inactive'
      ? 'FALSE'
      : ''
  const listPerson =
    (persons &&
      persons?.data?.length > 0 &&
      persons?.data.map((speaker) => ({
        key: String(speaker?.id),
        id: speaker?.id,
        date: formatDate(speaker?.created_at, 'DD/MM/YYYY Hora: HH:mm'),
        name: speaker?.name.toUpperCase(),
        surname: speaker?.surName.toUpperCase(),
        email: speaker?.email,
        phone: speaker?.phone || 'No registrado',
        institution: speaker?.institution,
        level: getTypePerson(speaker?.typePerson),
        status: speaker?.isActived,
      }))) ||
    []

  const dataExcel = persons && persons?.data?.length > 0 ? persons?.data : []

  const handleGetPersons = () => {
    getPersons({
      column: 'name',
      query: '',
      typePerson,
      status,
    })
  }

  const handleClearFilter = () => {
    router.push('/admin/reportes')
    setPersons({
      count: 0,
      data: [],
    })
  }

  return (
    <main className="flex flex-col gap-4">
      <HeaderSection
        title="Reportes de participantes"
        subtitle="Realiza un seguimiento de los participantes inscritos en el congreso"
        rigthContent={<ExportExcel dataList={dataExcel} />}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <TableGeneral
          columns={columns}
          rows={listPerson}
          selectionMode="single"
          headerChildren={
            <FiltersSection
              onChageFilter={handleGetPersons}
              onClearFilter={handleClearFilter}
            />
          }
          count={persons?.count}
          loading={loading}
          disableInputSearch
          disablePagination
        />
      </Suspense>
    </main>
  )
}
