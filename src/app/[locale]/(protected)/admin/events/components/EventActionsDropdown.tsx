'use client'

import { useState, useTransition } from 'react'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Input } from '@/components/ui/input'
import { deleteEvent } from '../actions'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface EventActionsProps {
    eventId: string
    eventName: string
}

export function EventActionsDropdown({ eventId, eventName }: EventActionsProps) {
    const locale = useLocale()
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deleteText, setDeleteText] = useState('')
    const [isPending, startTransition] = useTransition()

    const handleDelete = () => {
        if (deleteText !== 'DELETE') return
        startTransition(async () => {
            await deleteEvent(eventId)
            setIsDeleteDialogOpen(false)
            setDeleteText('')
        })
    }

    return (
        <TooltipProvider delayDuration={200}>
            <div className="flex items-center justify-center gap-1">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50" asChild>
                            <Link href={`/${locale}/admin/events/${eventId}`}>
                                <IconEdit className="h-4 w-4" />
                            </Link>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Editar evento</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setIsDeleteDialogOpen(true)}
                        >
                            <IconTrash className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Eliminar evento</p>
                    </TooltipContent>
                </Tooltip>

                <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar el evento?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. Se eliminará permanentemente el evento <strong>{eventName}</strong> y todos sus datos asociados (convocatorias, participantes).
                                <br /><br />
                                Escribe <strong>DELETE</strong> para confirmar.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="my-2">
                            <Input
                                placeholder="DELETE"
                                value={deleteText}
                                onChange={(e) => setDeleteText(e.target.value)}
                                disabled={isPending}
                            />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={deleteText !== 'DELETE' || isPending}
                            >
                                {isPending ? 'Eliminando...' : 'Eliminar'}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </TooltipProvider>
    )
}

