'use client'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { Button } from '@nextui-org/react'
import { IconDownload } from '@tabler/icons-react'

interface IProps<T> {
  dataList: T[]
  fileName?: string
  linkColumnKey?: string // Clave de la columna que contiene los enlaces
}

export const ExportExcelButton = <T extends Record<string, any>>(
  props: IProps<T>
) => {
  const { dataList, fileName, linkColumnKey } = props

  const name = fileName || 'data.xlsx'

  const handleExportToExcel = () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet 1')

    // Agregar las cabeceras
    const headers = Object.keys(dataList[0])
    const headerRow = worksheet.addRow(headers)

    // Establecer estilos para la cabecera
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '000000' }, // Color de fondo negro
      }
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFF' }, // Color de fuente blanco
        size: 12,
      }
      cell.alignment = { vertical: 'middle', horizontal: 'center' }
    })

    // Agregar los datos
    dataList.forEach((data) => {
      const row = worksheet.addRow(headers.map((header) => data[header]))

      // Si hay una columna de enlaces, agrega el enlace
      if (linkColumnKey && data[linkColumnKey]) {
        const cell = row.getCell(headers.indexOf(linkColumnKey) + 1) // Obtener la celda correspondiente
        cell.value = {
          text: 'Ver documento', // El texto visible
          hyperlink: data[linkColumnKey], // La URL del enlace
        }
        cell.font = { color: { argb: '0000FF' }, underline: true } // Estilo de enlace (azul y subrayado)
      }
    })

    // Ajustar el ancho de las columnas automáticamente
    worksheet.columns.forEach((column) => {
      let maxLength = 0
      if (column?.eachCell) {
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length : 10
          if (columnLength > maxLength) {
            maxLength = columnLength
          }
        })
      }
      column.width = maxLength + 2 // Añade un pequeño margen
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
        isDisabled={dataList?.length === 0}
      >
        Exportar a Excel
      </Button>
    </>
  )
}
