'use client'

import { useState, useTransition, useEffect } from 'react'
import { Reorder } from 'framer-motion'
import { IEventSponsor } from '@/types/ISponsors'
import { SponsorCard } from './SponsorCard'
import { reorderSponsors } from '../actions'
import { toast } from 'react-toastify'
import { IconMoodSad } from '@tabler/icons-react'

interface SponsorListWrapperProps {
    initialSponsors: IEventSponsor[]
    isEdition: boolean
}

export function SponsorListWrapper({ initialSponsors, isEdition }: SponsorListWrapperProps) {
    const [sponsors, setSponsors] = useState(initialSponsors)
    const [isPending, startTransition] = useTransition()

    // Update local state when initialSponsors changes (e.g. after adding/deleting)
    useEffect(() => {
        setSponsors(initialSponsors)
    }, [initialSponsors])

    const handleReorder = (newOrder: IEventSponsor[]) => {
        setSponsors(newOrder)
        
        // We calculate the new order indexes and update the backend
        const updates = newOrder.map((link, index) => ({
            id: link.id,
            order_index: index
        }))

        startTransition(async () => {
            const result = await reorderSponsors(updates)
            if (result.error) {
                toast.error(result.error)
            }
        })
    }

    if (sponsors.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <IconMoodSad size={32} strokeWidth={1.5} className="text-slate-400" />
                </div>
                <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Sin sponsors vinculados</h4>
                <p className="text-sm text-slate-500 text-center max-w-xs mt-1">
                    No hay patrocinadores registrados para este nivel.
                </p>
            </div>
        )
    }

    return (
        <Reorder.Group 
            axis="y" 
            values={sponsors} 
            onReorder={handleReorder}
            className="flex flex-col gap-2"
        >
            {sponsors.map((link) => (
                <SponsorCard 
                    key={link.id} 
                    link={link} 
                    isEdition={isEdition} 
                />
            ))}
        </Reorder.Group>
    )
}
