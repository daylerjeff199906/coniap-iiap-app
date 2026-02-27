'use client'
import ExcelJS from 'exceljs'
import { Button } from '@/components/ui/button'
import { IconTableShortcut, IconDownload } from '@tabler/icons-react'
import { toast } from 'react-toastify'

interface IProps<T> {
  dataList: T[]
  fileName?: string
  linkColumnKey?: string // Clave de la columna que contiene los enlaces
}

export const ExportExcelButton = <T extends Record<string, any>>(
  props: IProps<T>
) => {
  const { dataList, fileName, linkColumnKey } = props

  const name = fileName || 'reporte-coniap.xlsx'

  const handleExportToExcel = async () => {
    if (!dataList || dataList.length === 0) {
      toast.info('No hay datos para exportar')
      return
    }

    try {
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet('Reporte')

      // Agregar las cabeceras
      const headers = Object.keys(dataList[0])
      const headerRow = worksheet.addRow(headers)

      // Establecer estilos para la cabecera
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '002D61' }, // Color institucional azul oscuro
        }
        cell.font = {
          bold: true,
          color: { argb: 'FFFFFF' },
          size: 11,
        }
        cell.alignment = { vertical: 'middle', horizontal: 'center' }
      })

      // Agregar los datos
      dataList.forEach((data) => {
        const row = worksheet.addRow(headers.map((header) => data[header]))

        // Si hay una columna de enlaces, agrega el enlace
        if (linkColumnKey && data[linkColumnKey]) {
          const cell = row.getCell(headers.indexOf(linkColumnKey) + 1)
          cell.value = {
            text: 'Ver documento',
            hyperlink: data[linkColumnKey],
          }
          cell.font = { color: { argb: '0000FF' }, underline: true }
        }
      })

      // Ajustar el ancho de las columnas
      worksheet.columns.forEach((column) => {
        column.width = 20
      })

      const buffer = await workbook.xlsx.writeBuffer()
      const blob = new Blob([buffer], { type: 'application/octet-stream' })
      toast.success('Excel generado correctamente')
    } catch (error) {
      toast.error('Error al generar el archivo Excel')
    }
  }

  return (
    <Button
      onClick={handleExportToExcel}
      variant="outline"
      className="gap-2 font-bold rounded-xl border-green-600/30 text-green-700 hover:bg-green-50 hover:text-green-800 transition-all shadow-sm"
      disabled={dataList?.length === 0}
    >
      <IconTableShortcut size={18} stroke={2.5} />
      Exportar Excel
    </Button>
  )
}
