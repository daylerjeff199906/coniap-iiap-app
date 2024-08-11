'use client'
import { TableGeneral } from '@/components'
import { Suspense } from 'react'
import { columns } from './columns'
import { FiltersSection } from './FilterSection'
import { HeaderSection } from '@/modules/core'

export const ParticipantsReports = () => {
  return (
    <main className="flex flex-col gap-4">
      <HeaderSection
        title="Reportes de participantes"
        subtitle="Realiza un seguimiento de los participantes inscritos en el congreso"
        // rigthContent={<ExportExcel dataList={dataExcel} />}
      />
      <Suspense fallback={<div>Loading...</div>}>
        <TableGeneral
          columns={columns}
          //   onSearch={handleQuery}
          //   searchValue={query}
          disableInputSearch
          rows={[]}
          selectionMode="single"
          headerChildren={<FiltersSection />}
          //   count={persons?.count}
          //   page={Number(page)}
          //   onPageChange={handlePageChange}
        />
      </Suspense>
    </main>
  )
}
