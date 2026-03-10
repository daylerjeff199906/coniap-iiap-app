'use client'

import { useState, useTransition, useEffect } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconPlus, IconLink, IconSearch, IconSearchOff } from '@tabler/icons-react'
import { toast } from 'react-toastify'
import { getAllSponsors, linkExistingSponsor, createAndLinkSponsor } from '../actions'
import { ISponsor } from '@/types/ISponsors'
import { ImageUpload } from '@/components/general/ImageUpload/ImageUpload'

interface AddSponsorDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    targetId: string
    isEdition: boolean
    alreadyLinkedIds?: string[]
}

export function AddSponsorDialog({ open, onOpenChange, targetId, isEdition, alreadyLinkedIds = [] }: AddSponsorDialogProps) {
    const [isPending, startTransition] = useTransition()
    const [allSponsors, setAllSponsors] = useState<ISponsor[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [newSponsor, setNewSponsor] = useState<Partial<ISponsor>>({
        name: '',
        image: '',
        isActived: true
    })

    useEffect(() => {
        if (open) {
            startTransition(async () => {
                const data = await getAllSponsors()
                // Filter out already linked sponsors
                const filtered = data.filter(s => !alreadyLinkedIds.includes(s.id.toString()))
                setAllSponsors(filtered)
            })
        }
    }, [open, alreadyLinkedIds])

    const filteredSponsors = allSponsors.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleLinkExisting = (sponsorId: string | number) => {
        startTransition(async () => {
            const result = await linkExistingSponsor({
                targetId,
                isEdition,
                sponsorId
            })

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Sponsor vinculado correctamente')
                onOpenChange(false)
            }
        })
    }

    const handleCreateNew = (e: React.FormEvent) => {
        e.preventDefault()
        if (!newSponsor.name || !newSponsor.image) {
            toast.error('Nombre e imagen son obligatorios')
            return
        }

        startTransition(async () => {
            const result = await createAndLinkSponsor({
                targetId,
                isEdition,
                sponsorData: newSponsor
            })

            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Sponsor creado y vinculado')
                onOpenChange(false)
                setNewSponsor({ name: '', image: '', isActived: true })
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[500px] p-0 overflow-hidden border-none rounded-3xl shadow-2xl">
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-2xl font-bold tracking-tight">Añadir Sponsor</DialogTitle>
                    <DialogDescription>
                        Selecciona un sponsor existente de la base maestra o crea uno nuevo para este evento.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="existing" className="w-full">
                    <div className="px-6 pt-4">
                        <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 bg-slate-100/80 dark:bg-slate-800/50">
                            <TabsTrigger value="existing" className="rounded-xl flex items-center gap-2 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
                                <IconLink size={16} />
                                <span className="font-bold text-[13px]">Vincular Existente</span>
                            </TabsTrigger>
                            <TabsTrigger value="new" className="rounded-xl flex items-center gap-2 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700 data-[state=active]:shadow-sm">
                                <IconPlus size={16} />
                                <span className="font-bold text-[13px]">Crear Nuevo</span>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-6">
                        <TabsContent value="existing" className="m-0 space-y-4 animate-in fade-in zoom-in-95 duration-200">
                            <div className="relative">
                                <IconSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <Input 
                                    placeholder="Buscar por nombre..." 
                                    className="pl-9 rounded-xl border-slate-200 h-10 text-[13px]"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="max-h-[300px] overflow-y-auto pr-2 flex flex-col gap-2 custom-scrollbar">
                                {filteredSponsors.length > 0 ? (
                                    filteredSponsors.map(sponsor => (
                                        <div 
                                            key={sponsor.id} 
                                            className="group flex items-center gap-3 p-2 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-primary/5 transition-all cursor-pointer dark:border-slate-800 dark:hover:bg-slate-800"
                                            onClick={() => handleLinkExisting(sponsor.id)}
                                        >
                                            <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-50 dark:border-slate-700">
                                                <img src={sponsor.image} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="flex-1 font-bold text-sm text-slate-700 dark:text-slate-200 truncate">{sponsor.name}</span>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <IconPlus size={16} className="text-primary" />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                                        <IconSearchOff size={32} strokeWidth={1.5} className="mb-2 opacity-50" />
                                        <p className="text-sm font-medium">No se encontraron sponsors</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="new" className="m-0 animate-in fade-in zoom-in-95 duration-200">
                            <form onSubmit={handleCreateNew} className="space-y-5">
                                <div className="space-y-2">
                                    <Label className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Imagen del Sponsor (4:3)</Label>
                                    <ImageUpload 
                                        folder="sponsors"
                                        value={newSponsor.image}
                                        onChange={(url) => setNewSponsor(prev => ({ ...prev, image: url }))}
                                        className="rounded-3xl h-[160px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">Nombre</Label>
                                    <Input 
                                        id="name"
                                        placeholder="Ej: Google Cloud"
                                        className="h-11 rounded-xl border-slate-200"
                                        value={newSponsor.name}
                                        onChange={(e) => setNewSponsor(prev => ({ ...prev, name: e.target.value }))}
                                        required
                                    />
                                </div>

                                <DialogFooter className="pt-2">
                                    <Button 
                                        type="submit" 
                                        className="w-full h-11 rounded-full font-bold text-sm shadow-md transition-all active:scale-95"
                                        disabled={isPending}
                                    >
                                        {isPending ? 'Creando...' : 'Crear y Vincular Sponsor'}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
