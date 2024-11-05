'use client'
import { IEvent } from '@/types'
import {
  convertListEventsToExcel,
  convertListSummaryToExcel,
} from '@/modules/admin/participants'
import { ExportExcelButton } from '@/modules/admin'

interface IProps {
  dataList: Array<IEvent>
}

export const ExportEventsExcel = (props: IProps) => {
  const { dataList } = props
  const listExcel = convertListEventsToExcel(dataList)

  const dateNow = new Date()
  const tittle = 'Resumenes'

  return (
    <>
      <ExportExcelButton
        dataList={listExcel}
        fileName={`${tittle} - ${dateNow.toLocaleDateString()}.xlsx`}
        linkColumnKey="link"
      />
    </>
  )
}
