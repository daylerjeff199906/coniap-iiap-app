'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useRouter } from '@/i18n/routing'
import { deleteEdition } from '../actions'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'

export function EditionActions({ editionId, eventId, editionName }: { editionId: string, eventId: string, editionName: string }) {
    const router = useRouter()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (deleteConfirmation !== 'DELETE') return

        setIsDeleting(true)
        const result = await deleteEdition(editionId)

        if (result.error) {
            toast.error(result.error)
        } else {
            toast.success('Edición eliminada correctamente')
            setIsDeleteDialogOpen(false)
            router.refresh()
        }
        setIsDeleting(false)
    }

    return (
        <>
            <div className="flex items-center justify-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg text-slate-500 hover:text-[#0064e0] hover:bg-blue-50 transition-colors"
                    onClick={() => router.push(`/admin/events/${eventId}/edition/${editionId}`)}
                    title="Editar edición"
                >
                    <IconEdit className="h-[1.1rem] w-[1.1rem]" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-lg text-slate-500 hover:text-destructive hover:bg-destructive/10 transition-colors"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    title="Eliminar edición"
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
                            <IconTrash className="h-6 w-6" /> Eliminar Edición
                        </DialogTitle>
                        <DialogDescription className="text-[15px] pt-2">
                            Estás a punto de eliminar la edición <strong className="text-foreground">{editionName}</strong>. Esta acción no se puede deshacer y eliminará permanentemente todos los datos asociados.
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
