'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
    IconDownload,
    IconUpload,
    IconFileSpreadsheet,
    IconFileCode,
    IconCheck,
    IconX,
    IconAlertTriangle
} from '@tabler/icons-react'
import { toast } from 'react-toastify'
import ExcelJS from 'exceljs'
import { bulkImportActivities } from '@/app/[locale]/(protected)/admin/(with_layout)/activities/actions'
import { useRouter } from 'next/navigation'

interface ImportRow {
    index: number
    title: string
    session_date?: string | null
    start_time?: string | null
    end_time?: string | null
    session_type: string
    address?: string | null
    isValid: boolean
    errors: string[]
}

export function BulkImportView({ eventId, editionId }: { eventId: string, editionId?: string }) {
    const [loading, setLoading] = useState(false)
    const [importing, setImporting] = useState(false)
    const [rows, setRows] = useState<ImportRow[]>([])
    const [fileInfo, setFileInfo] = useState<{ name: string; size: string; type: string } | null>(null)
    const router = useRouter()

    const downloadTemplate = async (format: 'xlsx' | 'json') => {
        if (format === 'xlsx') {
            const workbook = new ExcelJS.Workbook()
            const worksheet = workbook.addWorksheet('Plantilla Actividades')

            // Set headers
            worksheet.columns = [
                { header: 'Título (Obligatorio)', key: 'title', width: 30 },
                { header: 'Fecha (YYYY-MM-DD)', key: 'date', width: 20 },
                { header: 'Hora Inicio (HH:MM)', key: 'start', width: 15 },
                { header: 'Hora Fin (HH:MM)', key: 'end', width: 15 },
                { header: 'Tipo (keynote/presentation/panel/workshop/networking/break/other)', key: 'type', width: 35 },
                { header: 'Dirección / Ubicación', key: 'address', width: 30 }
            ]

            // Add sample row
            worksheet.addRow({
                title: 'Taller de Innovación IA',
                date: '2026-05-15',
                start: '09:00',
                end: '11:00',
                type: 'workshop',
                address: 'Sala Magna A'
            })

            // Style headers
            worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } }
            worksheet.getRow(1).fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FF0064E0' }
            }

            const buffer = await workbook.xlsx.writeBuffer()
            const blob = new Blob([buffer])
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'Plantilla_Actividades.xlsx'
            a.click()
            URL.revokeObjectURL(url)
        } else {
            const templateJson = [{
                title: "Taller de Innovación IA",
                session_date: "2026-05-15",
                start_time: "09:00",
                end_time: "11:00",
                session_type: "workshop",
                address: "Sala Magna A"
            }]

            const blob = new Blob([JSON.stringify(templateJson, null, 2)], { type: 'application/json' })
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'Plantilla_Actividades.json'
            a.click()
            URL.revokeObjectURL(url)
        }
    }

    const validateRow = (row: any, index: number): ImportRow => {
        const errors: string[] = []
        const title = row.title?.trim() || ''

        if (!title) {
            errors.push('El título es obligatorio.')
        }

        const validTypes = ['keynote', 'presentation', 'panel', 'workshop', 'networking', 'break', 'other']
        const type = row.session_type?.trim()?.toLowerCase() || 'presentation'

        if (!validTypes.includes(type)) {
            errors.push(`Tipo inválido: ${type}. Debería ser uno de: ${validTypes.join(', ')}`)
        }

        return {
            index,
            title,
            session_date: row.session_date || null,
            start_time: row.start_time || null,
            end_time: row.end_time || null,
            session_type: type,
            address: row.address || null,
            isValid: errors.length === 0,
            errors
        }
    }

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        setFileInfo({
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            type: file.type
        })

        setLoading(true)
        try {
            let parsedData: any[] = []

            if (file.name.endsWith('.xlsx')) {
                const buffer = await file.arrayBuffer()
                const workbook = new ExcelJS.Workbook()
                await workbook.xlsx.load(buffer)
                const worksheet = workbook.getWorksheet(1)

                worksheet?.eachRow((row, rowNumber) => {
                    if (rowNumber === 1) return; // headers

                    parsedData.push({
                        title: row.getCell(1).text,
                        session_date: row.getCell(2).text,
                        start_time: row.getCell(3).text,
                        end_time: row.getCell(4).text,
                        session_type: row.getCell(5).text,
                        address: row.getCell(6).text
                    })
                })
            } else if (file.name.endsWith('.json')) {
                const text = await file.text()
                parsedData = JSON.parse(text)
            } else if (file.name.endsWith('.csv')) {
                const text = await file.text()
                const lines = text.split('\n')
                const headers = lines[0].split(',').map(h => h.trim())

                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim()
                    if (!line) continue;
                    const values = line.split(',')
                    parsedData.push({
                        title: values[0] || '',
                        session_date: values[1] || '',
                        start_time: values[2] || '',
                        end_time: values[3] || '',
                        session_type: values[4] || '',
                        address: values[5] || ''
                    })
                }
            } else {
                toast.error("Formato de archivo no soportado. Usa .xlsx, .json o .csv")
                setFileInfo(null)
                setLoading(false)
                return
            }

            const validatedRows = parsedData.map((row, index) => validateRow(row, index + 1))
            setRows(validatedRows)

        } catch (err: any) {
            toast.error("Error al procesar el archivo: " + err.message)
            setFileInfo(null)
        } finally {
            setLoading(false)
        }
    }

    const handleImport = async () => {
        const validRowsCount = rows.filter(r => r.isValid).length
        if (validRowsCount === 0) {
            toast.warning("No hay filas válidas para importar")
            return
        }

        setImporting(true)
        try {
            const payload = rows
                .filter(r => r.isValid)
                .map(r => ({
                    title: r.title,
                    session_date: r.session_date,
                    start_time: r.start_time,
                    end_time: r.end_time,
                    session_type: r.session_type,
                    address: r.address,
                    main_event_id: eventId,
                    edition_id: editionId || null,
                    is_active: true,
                    is_online: false
                }))

            const result = await bulkImportActivities(payload)

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success(`${payload.length} Actividades importadas con éxito`)
                router.push(`/admin/events/${eventId}/activities`)
            }
        } catch (error: any) {
            toast.error("Error al importar: " + error.message)
        } finally {
            setImporting(false)
        }
    }

    const invalidCount = rows.filter(r => !r.isValid).length

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-6">
                <Card className="rounded-2xl border-none shadow-sm bg-muted/20">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-base mb-2">1. Descargar Plantilla</h3>
                        <p className="text-sm text-muted-foreground mb-4">Utiliza una plantilla para asegurarte de que los datos tengan el formato correcto.</p>
                        <div className="flex flex-col gap-2">
                            <Button variant="outline" onClick={() => downloadTemplate('xlsx')} className="rounded-xl flex items-center justify-between w-full h-11 border-dashed">
                                <span className="flex items-center gap-2"><IconFileSpreadsheet size={18} className="text-[#008d36]" /> Microsoft Excel (.xlsx)</span>
                                <IconDownload size={16} />
                            </Button>
                            <Button variant="outline" onClick={() => downloadTemplate('json')} className="rounded-xl flex items-center justify-between w-full h-11 border-dashed">
                                <span className="flex items-center gap-2"><IconFileCode size={18} className="text-[#0064e0]" /> JSON format (.json)</span>
                                <IconDownload size={16} />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl border-none shadow-sm bg-muted/20">
                    <CardContent className="p-6">
                        <h3 className="font-semibold text-base mb-2">2. Subir Archivo</h3>
                        <p className="text-sm text-muted-foreground mb-4">Formatos soportados: Excel (.xlsx), JSON y CSV.</p>

                        <div className="border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/30 transition-all relative">
                            <IconUpload size={40} className="text-muted-foreground" />
                            <span className="text-sm font-medium mt-2">Arrastra o selecciona un archivo</span>
                            <span className="text-xs text-muted-foreground">Tamaño máximo: 5MB</span>
                            <input
                                type="file"
                                accept=".xlsx,.json,.csv"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFile}
                                disabled={loading || importing}
                            />
                        </div>

                        {fileInfo && (
                            <div className="mt-4 p-3 rounded-xl bg-muted fill-muted/10 flex justify-between items-center text-xs">
                                <div className="flex items-center gap-2">
                                    <IconFileSpreadsheet size={16} className="text-[#0064e0]" />
                                    <span className="font-medium truncate max-w-[120px]">{fileInfo.name}</span>
                                </div>
                                <span className="text-muted-foreground">{fileInfo.size}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-2 flex flex-col gap-6">
                <Card className="rounded-2xl border-none shadow-sm flex-1">
                    <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-semibold text-lg">3. Vista Previa</h3>
                                <p className="text-sm text-muted-foreground">Verifica los datos antes de completar la importación.</p>
                            </div>
                            {rows.length > 0 && (
                                <div className="flex items-center gap-2">
                                    {invalidCount > 0 && (
                                        <div className="flex items-center gap-1 text-amber-600 font-semibold text-sm">
                                            <IconAlertTriangle size={16} />
                                            {invalidCount} fila(s) con errores
                                        </div>
                                    )}
                                    <Button
                                        onClick={handleImport}
                                        disabled={importing || rows.filter(r => r.isValid).length === 0}
                                        className="rounded-xl flex items-center gap-2 bg-[#0064e0] hover:bg-[#0057c2] text-white"
                                    >
                                        Importar {rows.filter(r => r.isValid).length} actividades
                                    </Button>
                                </div>
                            )}
                        </div>

                        {loading ? (
                            <div className="flex-1 flex items-center justify-center">
                                <p className="text-muted-foreground">Procesando archivo...</p>
                            </div>
                        ) : rows.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl">
                                <IconFileSpreadsheet size={48} className="text-muted-foreground opacity-30" />
                                <p className="text-muted-foreground mt-2 text-sm">Sube un archivo para ver la vista previa aquí.</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-auto max-h-[500px]">
                                <table className="w-full text-sm">
                                    <thead className="sticky top-0 bg-white dark:bg-zinc-950 border-b z-10">
                                        <tr>
                                            <th className="text-left p-2 font-medium">Estado</th>
                                            <th className="text-left p-2 font-medium">Título</th>
                                            <th className="text-left p-2 font-medium">Fecha</th>
                                            <th className="text-left p-2 font-medium">Horario</th>
                                            <th className="text-left p-2 font-medium">Tipo</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        {rows.map((row) => (
                                            <tr key={row.index} className={`hover:bg-muted/50 ${!row.isValid ? 'bg-amber-500/5' : ''}`}>
                                                <td className="p-2">
                                                    {row.isValid ? (
                                                        <IconCheck size={16} className="text-green-600" />
                                                    ) : (
                                                        <div className="group relative cursor-help">
                                                            <IconX size={16} className="text-amber-600" />
                                                            <div className="absolute top-0 transform translate-x-6 bg-red-800 text-white rounded p-2 z-20 text-xs hidden group-hover:block w-48 shadow">
                                                                {row.errors.map((e, idx) => (
                                                                    <p key={idx}>{e}</p>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-2 font-medium truncate max-w-[200px]">{row.title}</td>
                                                <td className="p-2 text-muted-foreground">{row.session_date || '-'}</td>
                                                <td className="p-2 text-muted-foreground">
                                                    {row.start_time || '-'} a {row.end_time || '-'}
                                                </td>
                                                <td className="p-2">
                                                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                                        {row.session_type}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
