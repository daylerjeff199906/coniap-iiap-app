'use client'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { IPerson, IPersonExcel } from '@/types'
import { Button } from '@nextui-org/react'
import { IconDownload } from '@tabler/icons-react'
import { convertListPersonToExcel } from '../../functions'
import { exportToExcel } from '@/modules/admin/core'

interface IProps {
  dataList: Array<IPerson>
}

export const ExportExcel = (props: IProps) => {
  const { dataList } = props
  const listExcel = convertListPersonToExcel(dataList)

  const handleExportToExcel = () => {
    exportToExcel({
      dataList: listExcel,
      fileName: 'Participantes',
    })
  }

  return (
    <>
      <Button
        onPress={handleExportToExcel}
        radius="sm"
        size="sm"
        startContent={<IconDownload size={16} />}
        className="bg-success-700 text-white hover:bg-success-600"
      >
        Exportar a Excel
      </Button>
    </>
  )
}
