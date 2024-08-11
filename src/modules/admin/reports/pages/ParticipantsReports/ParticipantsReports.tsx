'use client'
import { TableGeneral } from '@/components'
import { Suspense } from 'react'
import { columns } from './columns'
import { FiltersSection } from './FilterSection'

export const ParticipantsReports = () => {
  return (
    <main>
      <header></header>
      <Suspense fallback={<div>Loading...</div>}>
        <TableGeneral
          columns={columns}
          //   onSearch={handleQuery}
          //   searchValue={query}
          rows={[]}
          selectionMode="single"
          headerChildren={<FiltersSection />}
          //   endInputSection={
          //     <TypesSearch
          //       selectedKey={typeSearch === 'name' ? ['name'] : [typeSearch]}
          //       onSelectionChange={handleTypeSearch}
          //     />
          //   }
          //   count={persons?.count}
          //   page={Number(page)}
          //   onPageChange={handlePageChange}
        />
      </Suspense>
    </main>
  )
}
