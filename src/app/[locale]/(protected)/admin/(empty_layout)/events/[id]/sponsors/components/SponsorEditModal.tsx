'use client'

import { useState, useTransition } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'react-toastify'
import { updateSponsorData } from '../actions'
import { ISponsor } from '@/types/ISponsors'
import { ImageUpload } from '@/components/general/ImageUpload/ImageUpload'

interface SponsorEditModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    sponsor: ISponsor
}

export function SponsorEditModal({ open, onOpenChange, sponsor }: SponsorEditModalProps) {
    const [isPending, startTransition] = useTransition()
    const [formData, setFormData] = useState<Partial<ISponsor>>({
        name: sponsor.name,
        image: sponsor.image,
        isActived: sponsor.isActived
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name || !formData.image) {
            toast.error('Nombre e imagen son obligatorios')
            return
        }

        startTransition(async () => {
            const result = await updateSponsorData(sponsor.id, formData)

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Sponsor actualizado')
                onOpenChange(false)
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[450px] p-0 overflow-hidden border-none rounded-3xl shadow-2xl">
                <DialogHeader className="p-6">
                    <DialogTitle className="text-2xl font-bold tracking-tight">Editar Sponsor</DialogTitle>
                    <DialogDescription>
                        Modifica los datos globales del sponsor. Estos cambios se reflejarán en todos los eventos donde esté vinculado.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="p-6 pt-0 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Logotipo (4:3)</Label>
                        <ImageUpload 
                            folder="sponsors"
                            value={formData.image}
                            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                            className="rounded-2xl h-[140px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-name" className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Nombre</Label>
                        <Input 
                            id="edit-name"
                            className="h-11 rounded-xl border-slate-200"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </div>

                    <DialogFooter className="pt-2">
                        <Button 
                            variant={"primary" as any}
                            type="submit" 
                            className="w-full h-11 rounded-full font-bold text-sm shadow-md"
                            disabled={isPending}
                        >
                            {isPending ? 'Guardando...' : 'Actualizar Sponsor'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
