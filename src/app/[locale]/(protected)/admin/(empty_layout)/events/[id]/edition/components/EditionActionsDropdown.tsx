'use client'

import { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import { useRouter } from '@/i18n/routing'
import { deleteEdition } from '../actions'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'

export function EditionActionsDropdown({ editionId, eventId, editionName }: { editionId: string, eventId: string, editionName: string }) {
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
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <IconDotsVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => router.push(`/admin/events/${eventId}/edition/${editionId}`)}
                        className="cursor-pointer"
                    >
                        <IconEdit className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setIsDeleteDialogOpen(true)}
                        className="cursor-pointer text-destructive focus:bg-destructive focus:text-destructive-foreground focus:outline-none"
                    >
                        <IconTrash className="mr-2 h-4 w-4" />
                        <span>Eliminar</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => {
                setIsDeleteDialogOpen(open)
                if (!open) setDeleteConfirmation('')
            }}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-destructive flex items-center gap-2">
                            <IconTrash className="h-6 w-6" /> Eliminar Edición
                        </DialogTitle>
                        <DialogDescription>
                            Estás a punto de eliminar la edición <strong>{editionName}</strong>. Esta acción no se puede deshacer y eliminará permanentemente la edición y sus datos asociados.
                            <br /><br />
                            Por favor, escribe <strong>DELETE</strong> para confirmar.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-2">
                        <Input
                            placeholder="Escribe DELETE"
                            value={deleteConfirmation}
                            onChange={(e) => setDeleteConfirmation(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteDialogOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={deleteConfirmation !== 'DELETE' || isDeleting}
                        >
                            {isDeleting ? 'Eliminando...' : 'Eliminar permanentemente'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
