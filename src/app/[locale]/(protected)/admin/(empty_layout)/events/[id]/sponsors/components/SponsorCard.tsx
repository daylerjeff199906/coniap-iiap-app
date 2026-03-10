'use client'

import { ISponsor, IEventSponsor } from '@/types/ISponsors'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { IconTrash, IconGripVertical, IconPencil } from '@tabler/icons-react'
import { toggleSponsorActivation, unlinkSponsor } from '../actions'
import { useTransition, useState } from 'react'
import { toast } from 'react-toastify'
import { SponsorEditModal } from './SponsorEditModal'
import { Reorder, useDragControls } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SponsorCardProps {
    link: IEventSponsor
    isEdition: boolean
    onUnlink?: () => void
}

export function SponsorCard({ link, isEdition, onUnlink }: SponsorCardProps) {
    const sponsor = link.sponsors as ISponsor
    const [isPending, startTransition] = useTransition()
    const [isEditOpen, setIsEditOpen] = useState(false)
    const dragControls = useDragControls()

    if (!sponsor) return null

    const handleToggle = () => {
        startTransition(async () => {
            const result = await toggleSponsorActivation(sponsor.id, sponsor.isActived)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Estado actualizado')
            }
        })
    }

    const handleUnlink = () => {
        if (!confirm('¿Estás seguro de desvincular este sponsor?')) return
        startTransition(async () => {
            const result = await unlinkSponsor(link.id)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Sponsor desvinculado')
                onUnlink?.()
            }
        })
    }

    return (
        <Reorder.Item
            value={link}
            id={link.id}
            dragListener={false}
            dragControls={dragControls}
            className="group relative bg-white dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 rounded-2xl p-3 flex items-center gap-4 transition-all hover:border-primary/50"
        >
            {/* Drag Handle */}
            <div
                className="flex items-center justify-center p-2 text-slate-300 hover:text-slate-500 cursor-grab active:cursor-grabbing transition-colors"
                onPointerDown={(e) => dragControls.start(e)}
            >
                <IconGripVertical size={20} />
            </div>

            {/* Sponsor Image 4:3 Minimal */}
            <div className="relative w-16 h-12 aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shrink-0">
                {sponsor.image ? (
                    <img
                        src={sponsor.image}
                        alt={sponsor.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                        N/A
                    </div>
                )}
            </div>

            {/* Info Minimal */}
            <div className="flex-1 flex flex-col min-w-0">
                <span className="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{sponsor.name}</span>
                <div className="flex items-center gap-2">
                    <span className={cn(
                        "text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider",
                        sponsor.isActived
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    )}>
                        {sponsor.isActived ? 'Activo' : 'Inactivo'}
                    </span>
                    <span className="text-[10px] text-slate-400 italic">Orden #{link.order_index}</span>
                </div>
            </div>

            {/* Minimalist Actions */}
            <div className="flex items-center gap-1 shrink-0">
                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors"
                    onClick={() => setIsEditOpen(true)}
                >
                    <IconPencil size={18} />
                </Button>

                <div className="flex items-center mx-2 h-4 w-px bg-slate-200 dark:bg-slate-800" />

                <Switch
                    checked={sponsor.isActived}
                    onCheckedChange={handleToggle}
                    disabled={isPending}
                    className="scale-75 data-[state=checked]:bg-emerald-500"
                />

                <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-1"
                    onClick={handleUnlink}
                    disabled={isPending}
                >
                    <IconTrash size={18} />
                </Button>
            </div>

            <SponsorEditModal
                open={isEditOpen}
                onOpenChange={setIsEditOpen}
                sponsor={sponsor}
            />
        </Reorder.Item>
    )
}
