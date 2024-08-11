'use client'
import { Suspense } from 'react'
import { TableGeneral } from '@/components'
import { columns } from './columns'
import { FiltersSection } from './FilterSection'
import { HeaderSection } from '@/modules/core'
import { ExportExcel, getTypePerson } from '@/modules/admin'
import { usePersons } from '@/hooks/admin'
import { convertDate } from '@/utils/functions'
import { useFilterFromUrl } from '@/modules/core'

export const ParticipantsReports = () => {
  const { getPersonsFilter, persons, loading } = usePersons()
  const { getParams } = useFilterFromUrl()

  const typePerson = getParams('typePerson', '')
  const status = getParams('status', '')

  const listPerson =
    (persons &&
      persons.data.length > 0 &&
      persons?.data.map((speaker) => ({
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
      }))) ||
    []

  const dataExcel = persons && persons.data.length > 0 ? persons.data : []

  const handleGetPersons = () => {
    getPersonsFilter({ typePerson, status })
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
          disableInputSearch
          rows={listPerson}
          selectionMode="single"
          headerChildren={<FiltersSection onChageFilter={handleGetPersons} />}
          count={persons?.count}
          loading={loading}
        />
      </Suspense>
    </main>
  )
}
