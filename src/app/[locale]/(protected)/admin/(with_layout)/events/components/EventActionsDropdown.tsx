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
import {
    IconEdit,
    IconTrash,
    IconDotsVertical,
    IconCalendarEvent,
    IconSpeakerphone,
    IconClock,
    IconUsers,
    IconFileText,
    IconAward
} from '@tabler/icons-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Input } from '@/components/ui/input'
import { deleteEvent } from '../actions'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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

    const items = [
        { name: 'Editar', href: `/${locale}/admin/events/${eventId}`, icon: IconEdit },
        { name: 'Ediciones', href: `/${locale}/admin/events/${eventId}/edition`, icon: IconCalendarEvent },
        { name: 'Convocatorias', href: `/${locale}/admin/events/${eventId}/call`, icon: IconSpeakerphone },
        { name: 'Actividades', href: `/${locale}/admin/events/${eventId}/activities`, icon: IconClock },
        { name: 'Participantes', href: `/${locale}/admin/events/${eventId}/participants`, icon: IconUsers },
        { name: 'Resúmenes', href: `/${locale}/admin/events/${eventId}/submissions`, icon: IconFileText },
        { name: 'Sponsors', href: `/${locale}/admin/events/${eventId}/sponsors`, icon: IconAward },
    ]

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 dropdown-trigger">
                        <IconDotsVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                    {items.map((item) => (
                        <DropdownMenuItem key={item.name} asChild>
                            <Link href={item.href} className="flex items-center gap-2 w-full cursor-pointer">
                                <item.icon className="h-4 w-4 text-muted-foreground" />
                                <span>{item.name}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                        className="text-red-600 focus:text-red-600 cursor-pointer flex items-center gap-2 w-full"
                        onSelect={(e) => {
                            e.preventDefault()
                            setIsDeleteDialogOpen(true)
                        }}
                    >
                        <IconTrash className="h-4 w-4" />
                        <span>Eliminar</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

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
        </>
    )
}


