'use client'
import { IPerson, IPersonExcel } from '@/types'
import { convertListPersonToExcel } from '../../functions'
import { ExportExcelButton } from '@/modules/admin'

interface IProps {
  dataList: Array<IPerson>
}

export const ExportExcel = (props: IProps) => {
  const { dataList } = props
  const listExcel = convertListPersonToExcel(dataList)

  return (
    <>
      <ExportExcelButton dataList={listExcel} />
    </>
  )
}
