'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { IconFileSpreadsheet, IconUpload } from '@tabler/icons-react'
import { toast } from 'react-toastify'
import ExcelJS from 'exceljs'
import { bulkImportActivities } from '../actions'

export function BulkUploadModal({ eventId, editionId }: { eventId?: string, editionId?: string }) {
     const [loading, setLoading] = useState(false)
     const [open, setOpen] = useState(false)

     const handleFile = async (e: any) => {
         const file = e.target.files?.[0]
         if (!file) return;

         setLoading(true)
         try {
             const buffer = await file.arrayBuffer()
             const workbook = new ExcelJS.Workbook()
             await workbook.xlsx.load(buffer)
             const worksheet = workbook.getWorksheet(1)

             const rows: any[] = []
             worksheet?.eachRow((row, rowNumber) => {
                  if (rowNumber === 1) return; // headers
                  
                  const title = row.getCell(1).text?.trim()
                  const session_date = row.getCell(2).text?.trim()
                  const start_time = row.getCell(3).text?.trim()
                  const end_time = row.getCell(4).text?.trim()
                  const session_type = row.getCell(5).text?.trim()?.toLowerCase() || 'presentation'
                  const address = row.getCell(6).text?.trim() || null
                  
                  if (title) {
                      rows.push({
                           title,
                           session_date: session_date || null,
                           start_time: start_time || null,
                           end_time: end_time || null,
                           session_type,
                           address,
                           main_event_id: eventId || null,
                           edition_id: editionId || null,
                           is_active: true,
                           is_online: false
                      })
                  }
             })

             if (rows.length === 0) {
                 toast.warning("No se encontraron filas con título para importar")
                 setLoading(false)
                 return
             }

             const result = await bulkImportActivities(rows)
             if (result.error) {
                  toast.error(result.error)
             } else {
                  toast.success(`${rows.length} Actividades importadas con éxito`)
                  setOpen(false)
             }
         } catch (err: any) {
             toast.error("Error al procesar excel: " + err.message)
         } finally {
             setLoading(false)
         }
     }

     return (
          <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-xl flex items-center gap-2 h-10">
                        <IconFileSpreadsheet className="h-4 w-4" /> Carga Masiva
                    </Button>
               </DialogTrigger>
               <DialogContent className="rounded-2xl max-w-md">
                     <DialogHeader><DialogTitle>Carga Masiva</DialogTitle></DialogHeader>
                     <p className="text-sm text-muted-foreground mt-2">Sube una plantilla .xlsx con columnas: Título, Fecha (YYYY-MM-DD), Hora Inicio, Hora Fin, Tipo, Dirección.</p>
                     
                     <div className="border-2 border-dashed rounded-2xl p-6 mt-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-all relative">
                          <IconUpload size={32} className="text-muted-foreground" />
                          <span className="text-sm font-medium mt-2">Seleccionar archivo Excel</span>
                          <input type="file" accept=".xlsx" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFile} disabled={loading} />
                     </div>

                     {loading && <p className="text-xs text-center text-blue-600 font-semibold mt-2">Procesando...</p>}
               </DialogContent>
          </Dialog>
     )
}
