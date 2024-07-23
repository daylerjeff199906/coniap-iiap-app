'use client'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { Button } from '@nextui-org/react'
import { IconDownload } from '@tabler/icons-react'

interface IProps<T> {
  dataList: T[]
  fileName?: string
}

export const ExportExcelButton = <T extends Record<string, any>>(
  props: IProps<T>
) => {
  const { dataList, fileName } = props

  const name = fileName || 'data.xlsx'

  const handleExportToExcel = () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    // Agregar las cabeceras
    const headers = Object.keys(dataList[0])

    worksheet.addRow(headers)

    // Agregar los datos
    dataList.forEach((data) => {
      const row = headers.map((header) => data[header])
      worksheet.addRow(row)
    })

    // Guardar el archivo con file-saver
    workbook.xlsx.writeBuffer().then((buffer) => {
      const data = new Blob([buffer], { type: 'application/octet-stream' })
      saveAs(data, name)
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
        isDisabled={dataList.length === 0}
      >
        Exportar a Excel
      </Button>
    </>
  )
}
