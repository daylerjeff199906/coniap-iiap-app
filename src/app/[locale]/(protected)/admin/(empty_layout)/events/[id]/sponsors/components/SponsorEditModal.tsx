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
import { Switch } from '@/components/ui/switch'
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
            <DialogContent className="max-w-[450px] p-0 overflow-hidden border-none rounded-[32px] shadow-2xl bg-white dark:bg-slate-900">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-8 pb-6">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                            Editar Sponsor
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                            Los cambios afectan a todas las ediciones vinculadas.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="p-8 pt-6 space-y-8">
                    <div className="space-y-3">
                        <Label className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                            LOGOTIPO (4:3)
                        </Label>
                        <ImageUpload 
                            folder="sponsors"
                            value={formData.image}
                            onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                            className="rounded-3xl h-[180px] border-2 border-dashed border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-colors"
                        />
                    </div>

                    <div className="space-y-3">
                        <Label htmlFor="edit-name" className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">
                            NOMBRE COMERCIAL / SIGLAS
                        </Label>
                        <Input 
                            id="edit-name"
                            className="h-12 rounded-2xl border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 focus:ring-primary/20 transition-all font-medium"
                            value={formData.name}
                            placeholder="Nombre del patrocinador"
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Estado Activo</span>
                            <span className="text-[11px] text-slate-500">Visible en la web pública</span>
                        </div>
                        <Switch 
                            checked={formData.isActived}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActived: checked }))}
                            className="data-[state=checked]:bg-emerald-500"
                        />
                    </div>

                    <DialogFooter className="pt-2 gap-3 sm:gap-0">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            className="rounded-full h-12 font-bold text-slate-500"
                        >
                            Cancelar
                        </Button>
                        <Button 
                            variant={"primary" as any}
                            type="submit" 
                            className="flex-1 h-12 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all active:scale-[0.98]"
                            disabled={isPending}
                        >
                            {isPending ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
