'use client'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { IPerson } from '@/types'
import { Button } from '@nextui-org/react'
import { IconDownload } from '@tabler/icons-react'

interface IProps {
  dataList: Array<IPerson>
}

export const ExportExcel = (props: IProps) => {
  const { dataList } = props

  const exportToExcel = () => {
    // Crear una hoja de trabajo de Excel (worksheet) a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(dataList)
    // Crear un libro de trabajo (workbook) y agregar la hoja de trabajo
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Participantes')
    // Generar un archivo Excel binario
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    })
    // Guardar el archivo con file-saver
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(data, 'asistentes.xlsx')
  }
  return (
    <>
      <Button
        onPress={exportToExcel}
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
