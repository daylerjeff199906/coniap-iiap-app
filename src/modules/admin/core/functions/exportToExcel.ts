'use client'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

interface ExportToExcelProps<T> {
  dataList: T[]
  fileName?: string
}

export const exportToExcel = <T>({
  dataList,
  fileName = 'data.xlsx',
}: ExportToExcelProps<T>) => {
  // Crear una hoja de trabajo de Excel (worksheet) a partir de los datos
  const worksheet = XLSX.utils.json_to_sheet(dataList)
  // Crear un libro de trabajo (workbook) y agregar la hoja de trabajo
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  // Generar un archivo Excel binario
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  // Guardar el archivo con file-saver
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
  saveAs(data, fileName)
}
