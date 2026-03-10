'use client'

import { ISponsor, IEventSponsor } from '@/types/ISponsors'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { IconTrash, IconExternalLink, IconGripVertical, IconPencil } from '@tabler/icons-react'
import { toggleSponsorActivation, unlinkSponsor } from '../actions'
import { useTransition, useState } from 'react'
import { toast } from 'react-toastify'
import { SponsorEditModal } from './SponsorEditModal'

interface SponsorCardProps {
    link: IEventSponsor
    isEdition: boolean
    onUnlink?: () => void
}

export function SponsorCard({ link, isEdition, onUnlink }: SponsorCardProps) {
    const sponsor = link.sponsors as ISponsor
    const [isPending, startTransition] = useTransition()
    const [isEditOpen, setIsEditOpen] = useState(false)

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
            const result = await unlinkSponsor(link.id, isEdition)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Sponsor desvinculado')
                onUnlink?.()
            }
        })
    }

    return (
        <Card className="group relative overflow-hidden rounded-2xl border-slate-200/60 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4">
                {/* Drag Handle (Placeholder for now) */}
                <div className="hidden sm:flex text-slate-300 cursor-grab active:cursor-grabbing">
                    <IconGripVertical size={20} />
                </div>

                {/* Sponsor Image 4:3 */}
                <div className="relative w-full sm:w-32 aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shrink-0">
                    {sponsor.image ? (
                        <img 
                            src={sponsor.image} 
                            alt={sponsor.name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                            No image
                        </div>
                    )}
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col gap-1 min-w-0 w-full text-center sm:text-left">
                    <h3 className="font-bold text-slate-800 dark:text-slate-100 truncate">{sponsor.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">Orden: {link.order_index}</p>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            sponsor.isActived 
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' 
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                        }`}>
                            {sponsor.isActived ? 'Activo' : 'Inactivo'}
                        </span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row sm:flex-col items-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto justify-center">
                    <div className="flex items-center gap-2">
                         <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/5 transition-colors"
                            onClick={() => setIsEditOpen(true)}
                        >
                            <IconPencil size={18} />
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            onClick={handleUnlink}
                            disabled={isPending}
                        >
                            <IconTrash size={18} />
                        </Button>
                    </div>
                    
                    <div className="h-4 w-px bg-slate-100 sm:hidden mx-1" />

                    <div className="flex items-center gap-2">
                        <Switch 
                            checked={sponsor.isActived} 
                            onCheckedChange={handleToggle}
                            disabled={isPending}
                            className="data-[state=checked]:bg-emerald-500"
                        />
                    </div>
                </div>
            </div>

            <SponsorEditModal 
                open={isEditOpen} 
                onOpenChange={setIsEditOpen} 
                sponsor={sponsor} 
            />
        </Card>
    )
}
