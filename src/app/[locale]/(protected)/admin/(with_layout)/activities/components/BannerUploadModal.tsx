'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ImageUpload } from '@/components/general/ImageUpload/ImageUpload'
import { IconPhoto, IconUpload, IconLink, IconCheck } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

interface BannerUploadModalProps {
    value: string
    onChange: (url: string) => void
    folder?: string
}

const defaultBanners = [
    'https://images.unsplash.com/photo-1540575861501-7ec06085a704?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1475721027185-404cedc89f54?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop'
]

export function BannerUploadModal({ value, onChange, folder = 'sessions' }: BannerUploadModalProps) {
    const [open, setOpen] = useState(false)
    const [linkUrl, setLinkUrl] = useState('')

    const handleSelectDefault = (url: string) => {
        onChange(url)
        setOpen(false)
    }

    const handleLinkSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (linkUrl) {
            onChange(linkUrl)
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <div className="group relative w-full h-48 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden hover:border-[#0064e0] transition-all">
                    {value ? (
                        <>
                            <img src={value} alt="Banner" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button size="sm" variant="secondary" className="rounded-xl">
                                    Cambiar Banner
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0064e0]">
                                <IconPhoto className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium">Seleccionar o subir banner</span>
                        </div>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-2xl rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Subir Banner de la Sesión</DialogTitle>
                </DialogHeader>

                <Tabs defaultValue="defaults" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 rounded-xl bg-muted/50 p-1">
                        <TabsTrigger value="defaults" className="rounded-lg flex items-center gap-1.5"><IconPhoto className="h-4 w-4" /> Portadas</TabsTrigger>
                        <TabsTrigger value="upload" className="rounded-lg flex items-center gap-1.5"><IconUpload className="h-4 w-4" /> Subir</TabsTrigger>
                        <TabsTrigger value="link" className="rounded-lg flex items-center gap-1.5"><IconLink className="h-4 w-4" /> Enlace</TabsTrigger>
                    </TabsList>

                    <TabsContent value="defaults" className="mt-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {defaultBanners.map((url, index) => (
                                <div 
                                    key={index} 
                                    className={cn(
                                        "relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-[1.02]",
                                        value === url ? "border-[#0064e0]" : "border-transparent"
                                    )}
                                    onClick={() => handleSelectDefault(url)}
                                >
                                    <img src={url} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
                                    {value === url && (
                                        <div className="absolute top-2 right-2 bg-[#0064e0] text-white p-1 rounded-full">
                                            <IconCheck className="h-3 w-3" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="upload" className="mt-4">
                        <ImageUpload 
                            value={value} 
                            onChange={(url) => {
                                onChange(url)
                                if (url) setOpen(false)
                            }} 
                            folder={folder} 
                        />
                    </TabsContent>

                    <TabsContent value="link" className="mt-4">
                        <form onSubmit={handleLinkSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Enlace de imagen</Label>
                                <Input 
                                    placeholder="https://images.unsplash.com/..." 
                                    value={linkUrl} 
                                    onChange={e => setLinkUrl(e.target.value)} 
                                    className="rounded-xl h-11"
                                />
                            </div>
                            <Button type="submit" className="w-full rounded-xl bg-[#0064e0] hover:bg-[#0057c2]" disabled={!linkUrl}>
                                Aplicar Enlace
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
