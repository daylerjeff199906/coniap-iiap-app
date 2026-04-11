'use client'

import React, { useState, useTransition } from 'react'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'react-toastify'
import {
    IconPlus,
    IconTrash,
    IconEdit,
    IconLoader2,
    IconSettings,
    IconClick,
    IconCircleCheck,
    IconAlertCircle,
    IconLayoutGrid,
    IconExternalLink
} from '@tabler/icons-react'
import { createModule, updateModule, deleteModule, IModule } from '../roles-permissions-actions'
import { cn } from '@/lib/utils'
import { useRouter } from '@/i18n/routing'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ModulesManagerProps {
    modules: IModule[]
}

export function ModulesManager({ modules }: ModulesManagerProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [moduleToEdit, setModuleToEdit] = useState<IModule | null>(null)
    const [moduleToDelete, setModuleToDelete] = useState<string | null>(null)

    // Form state
    const [formData, setFormData] = useState<Partial<IModule>>({
        name: '',
        code: '',
        description: '',
        url: '',
        icon_name: '',
        color_class: 'bg-indigo-600'
    })

    const handleOpenDialog = (module?: IModule) => {
        if (module) {
            setModuleToEdit(module)
            setFormData({
                name: module.name,
                code: module.code,
                description: module.description || '',
                url: module.url,
                icon_name: module.icon_name,
                color_class: module.color_class
            })
        } else {
            setModuleToEdit(null)
            setFormData({
                name: '',
                code: '',
                description: '',
                url: '',
                icon_name: 'IconApps',
                color_class: 'bg-indigo-600'
            })
        }
        setIsDialogOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.code || !formData.url) return

        startTransition(async () => {
            let result;
            if (moduleToEdit) {
                result = await updateModule(moduleToEdit.id, formData)
            } else {
                result = await createModule(formData)
            }

            if (result.success) {
                toast.success(moduleToEdit ? 'Módulo actualizado' : 'Módulo creado')
                setIsDialogOpen(false)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    const handleDelete = async (id: string) => {
        startTransition(async () => {
            const result = await deleteModule(id)
            if (result.success) {
                toast.success('Módulo eliminado')
                setModuleToDelete(null)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Módulos del Sistema</h2>
                    <p className="text-sm text-slate-500 italic">Arquitectura central: gestiona las aplicaciones y secciones operativas.</p>
                </div>
                <Button
                    onClick={() => handleOpenDialog()}
                    className="h-9 px-5 rounded-md bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
                >
                    <IconPlus size={16} />
                    <span>Nuevo Módulo</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {modules.length > 0 ? (
                    modules.map((m) => (
                        <Card key={m.id} className="group relative overflow-hidden border border-slate-200 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 rounded-2xl bg-white">
                            <CardHeader className="p-6 pb-4">
                                <div className="flex items-start justify-between">
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 group-hover:scale-110 transition-transform duration-500",
                                        m.color_class || 'bg-slate-900'
                                    )}>
                                        <IconSettings size={24} stroke={1.5} />
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"
                                            onClick={() => handleOpenDialog(m)}
                                        >
                                            <IconEdit size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                                            onClick={() => setModuleToDelete(m.id)}
                                        >
                                            <IconTrash size={16} />
                                        </Button>
                                    </div>
                                </div>
                                <div className="mt-4 space-y-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-semibold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{m.name}</h3>
                                        {!m.is_active && (
                                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 uppercase tracking-tighter italic">Inactivo</span>
                                        )}
                                    </div>
                                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">{m.code}</p>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 pt-0 space-y-6">
                                <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2 h-10 italic">
                                    {m.description || 'Sin descripción detallada para este módulo operacional.'}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tighter">{m.url}</span>
                                    </div>
                                    <IconExternalLink size={14} className="text-slate-300" />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/30 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-300 mb-4">
                            <IconLayoutGrid size={32} stroke={1} />
                        </div>
                        <h3 className="text-slate-900 font-semibold text-lg">No hay módulos registrados</h3>
                        <p className="text-slate-500 text-sm max-w-xs mt-2 italic">Define el primer pilar de tu ecosistema administrativo para comenzar a gestionar permisos.</p>
                    </div>
                )}
            </div>

            {/* Steps / Guide Section */}
            <div className="mt-12 p-8 rounded-3xl bg-indigo-50/30 border border-indigo-100/50 flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-4">
                    <h4 className="text-indigo-900 font-semibold text-lg flex items-center gap-2">
                        <IconClick size={20} />
                        Cómo funciona la Arquitectura
                    </h4>
                    <ul className="space-y-4">
                        {[
                            { title: '1. Registro del Módulo', desc: 'Define la unidad de negocio o sección del sistema (ej: "Inventario", "Finanzas").' },
                            { title: '2. Definición de Permisos', desc: 'Una vez creado el módulo, ve a la sección de Roles para definir acciones específicas (read, write).' },
                            { title: '3. Asignación a Perfiles', desc: 'Asocia grupos de permisos a Roles para dar acceso estructurado a tus usuarios.' }
                        ].map((step, i) => (
                            <li key={i} className="flex gap-4">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-indigo-600 border border-indigo-100 flex items-center justify-center text-[10px] font-semibold">{i + 1}</span>
                                <div>
                                    <p className="text-[13px] font-semibold text-indigo-900">{step.title}</p>
                                    <p className="text-xs text-indigo-700/70">{step.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-full md:w-80 p-6 rounded-2xl bg-white border border-indigo-100 shadow-sm flex flex-col justify-center">
                    <IconAlertCircle className="text-amber-500 mb-3" size={24} />
                    <h5 className="text-[13px] font-semibold text-slate-900">Nota de Seguridad</h5>
                    <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                        Los cambios en el código (slug) del módulo pueden afectar las validaciones de acceso en el frontend. Procede con cautela al editar módulos en producción.
                    </p>
                </div>
            </div>

            {/* Dialog Form */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg rounded-3xl border-none p-0 overflow-hidden shadow-2xl">
                    <DialogHeader className="p-8 pb-0">
                        <DialogTitle className="text-xl font-semibold text-slate-900 tracking-tight">
                            {moduleToEdit ? 'Editar Configuración' : 'Nuevo Registro de Módulo'}
                        </DialogTitle>
                        <DialogDescription className="text-sm">Configura las propiedades fundamentales de la aplicación.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Nombre Público</label>
                                <Input
                                    placeholder="Ej: Dashboard principal"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="h-11 rounded-xl border-slate-200 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Código Identificador</label>
                                <Input
                                    placeholder="Ej: dashboard-v1"
                                    value={formData.code}
                                    onChange={e => setFormData({ ...formData, code: e.target.value })}
                                    className="h-11 font-mono rounded-xl border-slate-200 bg-slate-50 focus:ring-indigo-600"
                                    required
                                    disabled={!!moduleToEdit}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Ruta URL de Destino</label>
                            <Input
                                placeholder="/admin/dashboard"
                                value={formData.url}
                                onChange={e => setFormData({ ...formData, url: e.target.value })}
                                className="h-11 rounded-xl border-slate-200 focus:ring-indigo-500"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Breve Descripción</label>
                            <Textarea
                                placeholder="Describe el propósito de este módulo..."
                                value={formData.description || ''}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="rounded-xl border-slate-200 focus:ring-indigo-500 min-h-[80px] resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Color Temático</label>
                                <div className="flex flex-wrap gap-2">
                                    {['bg-indigo-600', 'bg-emerald-600', 'bg-rose-600', 'bg-amber-600', 'bg-slate-900', 'bg-violet-600'].map(c => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color_class: c })}
                                            className={cn(
                                                "w-8 h-8 rounded-full border-2 transition-all",
                                                c,
                                                formData.color_class === c ? "border-slate-400 scale-110 shadow-lg" : "border-transparent opacity-80"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest pl-1">Estado Operativo</label>
                                <div className="flex items-center gap-4 h-11">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setFormData({ ...formData, is_active: !formData.is_active })}
                                        className={cn(
                                            "w-full h-full rounded-xl font-semibold text-xs flex items-center justify-center gap-2",
                                            formData.is_active !== false
                                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                                : "bg-red-50 text-red-600 border-red-200"
                                        )}
                                    >
                                        <div className={cn("w-2 h-2 rounded-full", formData.is_active !== false ? "bg-emerald-600" : "bg-red-600")} />
                                        {formData.is_active !== false ? 'ACTIVADO' : 'SUSPENDIDO'}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <DialogFooter className="pt-2">
                            <Button
                                type="submit"
                                className="h-12 w-full rounded-xl bg-slate-900 text-white font-semibold tracking-tight hover:bg-black transition-all shadow-xl shadow-slate-200"
                                disabled={isPending}
                            >
                                {isPending ? <IconLoader2 className="animate-spin" size={18} /> : (moduleToEdit ? 'Confirmar Actualización' : 'Registrar Módulo en Sistema')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <AlertDialog open={!!moduleToDelete} onOpenChange={o => !o && setModuleToDelete(null)}>
                <AlertDialogContent className="rounded-3xl border-none shadow-2xl p-8">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-semibold text-slate-900">¿Eliminar módulo permanentemente?</AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-slate-500 mt-2 leading-relaxed italic">
                            Esta acción es irreversible y eliminará todos los permisos asociados a este módulo. Los roles que dependan de estas acciones quedarán incompletos.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-8 gap-3 sm:gap-4">
                        <AlertDialogCancel className="h-11 rounded-xl text-[13px] font-semibold border-slate-200 hover:bg-slate-50 w-full sm:w-auto">Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => moduleToDelete && handleDelete(moduleToDelete)}
                            className="h-11 rounded-xl text-[13px] font-semibold bg-red-600 hover:bg-red-700 text-white border-none shadow-lg shadow-red-100 w-full sm:w-auto"
                        >
                            Confirmar Baja de Módulo
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
