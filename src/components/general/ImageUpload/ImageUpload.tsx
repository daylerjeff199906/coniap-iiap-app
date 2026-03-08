'use client'

import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
    value?: string
    onChange: (url: string) => void
    folder?: string
    className?: string
}

export function ImageUpload({ value, onChange, folder = 'editions', className }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleUpload = async (file: File) => {
        if (!file) return

        try {
            setUploading(true)
            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', folder)

            const response = await fetch('/api/r2/upload', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (data.url) {
                // If there's an existing URL, we might want to delete it from R2
                // But for now, just update the value
                if (value) {
                    await handleDeleteFromR2(value)
                }
                onChange(data.url)
            }
        } catch (error) {
            console.error('Error uploading image:', error)
        } finally {
            setUploading(false)
        }
    }

    const handleDeleteFromR2 = async (url: string) => {
        try {
            await fetch('/api/r2/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            })
        } catch (error) {
            console.error('Error deleting image from R2:', error)
        }
    }

    const handleRemove = async (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (value) {
            await handleDeleteFromR2(value)
            onChange('')
        }
    }

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0])
        }
    }

    return (
        <div className={cn("w-full space-y-4", className)}>
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-2xl transition-all duration-200 flex flex-col items-center justify-center p-6 text-center h-48",
                    dragActive ? "border-[#0064e0] bg-blue-50/50" : "border-slate-200 hover:border-slate-300 bg-slate-50/10",
                    value && "border-none p-0 h-48 overflow-hidden bg-muted"
                )}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => !value && !uploading && fileInputRef.current?.click()}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
                    disabled={uploading}
                />

                {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-[#0064e0] animate-spin" />
                        <span className="text-sm font-medium text-slate-500">Subiendo imagen...</span>
                    </div>
                ) : value ? (
                    <div className="group relative w-full h-full">
                        <img src={value} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                size="sm"
                                variant="destructive"
                                className="rounded-full flex items-center gap-2 h-9 px-4"
                                onClick={handleRemove}
                            >
                                <X className="w-4 h-4" /> Eliminar
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3 cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0064e0]">
                            <ImageIcon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-slate-700">Arrastra una imagen o haz clic para subir</p>
                            <p className="text-[12px] text-slate-400">PNG, JPG, WEBP hasta 5MB</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Hidden input for form submission if needed */}
            <input type="hidden" name="cover_url" value={value || ''} />
        </div>
    )
}
