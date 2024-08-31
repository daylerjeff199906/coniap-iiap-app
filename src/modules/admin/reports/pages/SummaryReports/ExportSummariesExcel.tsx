'use client'
import { ISummary } from '@/types'
import { convertListSummaryToExcel } from '@/modules/admin/participants'
import { ExportExcelButton } from '@/modules/admin'

interface IProps {
  dataList: Array<ISummary>
}

export const ExportSummariesExcel = (props: IProps) => {
  const { dataList } = props
  const listExcel = convertListSummaryToExcel(dataList)

  const dateNow = new Date()
  const tittle = 'Resumenes'

  return (
    <>
      <ExportExcelButton
        dataList={listExcel}
        fileName={`${tittle} - ${dateNow.toLocaleDateString()}.xlsx`}
      />
    </>
  )
}
