'use client'

import React, { useState, useRef } from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Edit, Loader2, Trash2, Upload } from 'lucide-react'
import { updateAvatar } from '../actions'
import { toast } from 'react-toastify'
import { useTranslations } from 'next-intl'

interface AvatarUploadProps {
    avatarUrl?: string | null
    firstName?: string
    lastName?: string
    profileId: string
}

export function AvatarUpload({ avatarUrl, firstName, lastName, profileId }: AvatarUploadProps) {
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl || null)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('Tipo de archivo no válido')
            return
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            toast.error('Archivo demasiado grande (máx 5MB)')
            return
        }

        setIsUploading(true)

        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', 'avatars')

            // Upload to R2 via API
            const response = await fetch('/api/r2/upload', {
                method: 'POST',
                body: formData
            })

            if (!response.ok) {
                throw new Error('Upload failed')
            }

            const data = await response.json()
            const newUrl = data.url

            // Update profile
            const updateResult = await updateAvatar(newUrl, profileId)
            if (updateResult.error) {
                throw new Error(updateResult.error)
            }

            setPreviewUrl(newUrl)
            toast.success('Avatar actualizado correctamente')

        } catch (error) {
            console.error(error)
            toast.error('Error al actualizar el avatar')
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) fileInputRef.current.value = ''
        }
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent triggering file input
        if (!previewUrl) return

        if (!confirm('¿Estás seguro de que deseas eliminar la foto de perfil?')) return

        setIsUploading(true)
        try {
            // Delete from R2
            await fetch('/api/r2/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: previewUrl })
            })

            // Update Profile to null
            const updateResult = await updateAvatar('', profileId)
            if (updateResult.error) throw new Error(updateResult.error)

            setPreviewUrl(null)
            toast.success('Avatar eliminado')
        } catch (error) {
            console.error(error)
            toast.error('Error al eliminar el avatar')
        } finally {
            setIsUploading(false)
        }
    }

    const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase() || 'U'

    return (
        <div className="relative group min-w-[100px] min-h-[100px] h-24 w-24">
            <Avatar className="h-24 w-24 border-2 border-slate-100 cursor-pointer shadow-sm" onClick={() => fileInputRef.current?.click()}>
                <AvatarImage src={previewUrl || ''} alt="Profile" className="object-cover" />
                <AvatarFallback className="text-xl font-bold bg-slate-50 text-slate-400">{initials}</AvatarFallback>
            </Avatar>

            <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 gap-2 pointer-events-none">
                <div className="flex gap-2 pointer-events-auto">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 rounded-full opacity-90 hover:opacity-100"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                    >
                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Edit className="h-4 w-4" />}
                    </Button>
                    {previewUrl && (
                        <Button
                            size="icon"
                            variant="destructive"
                            className="h-8 w-8 rounded-full opacity-90 hover:opacity-100"
                            onClick={handleDelete}
                            disabled={isUploading}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
            />
        </div>
    )
}
