'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { IconPlus } from '@tabler/icons-react'
import { AddSponsorDialog } from './AddSponsorDialog'

interface AddSponsorButtonProps {
    targetId: string
    isEdition: boolean
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary"
    alreadyLinkedIds?: string[]
}

export function AddSponsorButton({ targetId, isEdition, variant = "primary", alreadyLinkedIds = [] }: AddSponsorButtonProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Button 
                onClick={() => setIsOpen(true)}
                variant={variant as any}
                className="rounded-full shadow-md flex items-center gap-2 font-bold text-[13px] px-6"
            >
                <IconPlus size={18} />
                <span>Añadir Sponsor</span>
            </Button>

            <AddSponsorDialog 
                open={isOpen} 
                onOpenChange={setIsOpen} 
                targetId={targetId} 
                isEdition={isEdition} 
                alreadyLinkedIds={alreadyLinkedIds}
            />
        </>
    )
}
