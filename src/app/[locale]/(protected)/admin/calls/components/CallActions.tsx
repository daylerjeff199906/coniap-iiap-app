'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash, IconEye } from '@tabler/icons-react'
import { useRouter, Link } from '@/i18n/routing'
import { deleteCall } from '../actions'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'

interface CallActionsProps {
    callId: string;
    callTitle: string;
    eventId?: string;
}

export function CallActions({ callId, callTitle, eventId }: CallActionsProps) {
    const router = useRouter()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (deleteConfirmation !== 'DELETE') return

        setIsDeleting(true)
        const result = await deleteCall(callId)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success('Convocatoria eliminada correctamente')
            setIsDeleteDialogOpen(false)
            router.refresh()
        }
        setIsDeleting(false)
    }

    return (
        <>
            <div className="flex items-center justify-center gap-1">
                <Link href={eventId ? `/admin/events/${eventId}/call/${callId}` : `/admin/calls/${callId}`}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-lg text-slate-500 hover:text-[#0064e0] hover:bg-blue-50 transition-colors"
                        title="Ver detalles"
                    >
                        <IconEye className="h-[1.1rem] w-[1.1rem]" />
                    </Button>
                </Link>

                <Link href={eventId ? `/admin/events/${eventId}/call/${callId}/edit` : `/admin/calls/${callId}/edit`}>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-lg text-slate-500 hover:text-[#0064e0] hover:bg-blue-50 transition-colors"
                        title="Editar convocatoria"
                    >
                        <IconEdit className="h-[1.1rem] w-[1.1rem]" />
                    </Button>
                </Link>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg text-slate-500 hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    title="Eliminar convocatoria"
                >
                    <IconTrash className="h-[1.1rem] w-[1.1rem]" />
                </Button>
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => {
                setIsDeleteDialogOpen(open)
                if (!open) setDeleteConfirmation('')
            }}>
                <DialogContent className="max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-destructive flex items-center gap-2 text-xl">
                            <IconTrash className="h-6 w-6" /> Eliminar Convocatoria
                        </DialogTitle>
                        <DialogDescription className="text-[15px] pt-2">
                            Estás a punto de eliminar la convocatoria <strong className="text-foreground">{callTitle}</strong>. Esta acción no se puede deshacer.
                            <br /><br />
                            Por favor, escribe <strong className="text-foreground select-none">DELETE</strong> para confirmar esta acción.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <Input
                            placeholder="Escribe DELETE para confirmar"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                            className="h-11 rounded-xl border-slate-200 focus:ring-[#0064e0]"
                        />
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isDeleting}
                            className="rounded-full h-11 px-6 font-medium border-slate-200"
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                            className="rounded-full h-11 px-6 font-medium shadow-sm"
                        >
                            {isDeleting ? 'Eliminando...' : 'Eliminar permanentemente'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
