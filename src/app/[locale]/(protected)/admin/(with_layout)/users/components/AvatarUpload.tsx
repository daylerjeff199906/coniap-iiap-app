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
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(avatarUrl || null)

    const processFile = async (file: File) => {
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

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) await processFile(file)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        if (!isUploading) setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        if (isUploading) return

        const file = e.dataTransfer.files?.[0]
        if (file) await processFile(file)
    }

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!previewUrl) return

        if (!confirm('¿Estás seguro de que deseas eliminar la foto de perfil?')) return

        setIsUploading(true)
        try {
            await fetch('/api/r2/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: previewUrl })
            })

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
        <div
            className="relative group min-w-[160px] min-h-[160px] h-40 w-40"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <Avatar
                className={`h-40 w-40 border-4 cursor-pointer shadow-xl transition-all duration-300 relative overflow-hidden ${isDragging
                    ? 'border-indigo-500 ring-4 ring-indigo-500/20 scale-105'
                    : 'border-white group-hover:border-slate-100 group-hover:scale-[1.02]'
                    }`}
                onClick={() => fileInputRef.current?.click()}
            >
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Profile"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.visibility = 'hidden'
                        }}
                    />
                ) : null}
                <AvatarFallback className="text-4xl font-black bg-slate-50 text-slate-400 absolute inset-0 flex items-center justify-center">
                    {isDragging ? <Upload className="animate-bounce" /> : initials}
                </AvatarFallback>
            </Avatar>

            <div className={`absolute inset-0 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50 gap-3 pointer-events-none ${isDragging ? '!opacity-0' : ''}`}>
                <div className="flex gap-3 pointer-events-auto">
                    <Button
                        size="icon"
                        variant="secondary"
                        className="h-10 w-10 rounded-full shadow-lg hover:scale-110 transition-transform"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                    >
                        {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Edit className="h-5 w-5" />}
                    </Button>
                    {previewUrl && (
                        <Button
                            size="icon"
                            variant="destructive"
                            className="h-10 w-10 rounded-full shadow-lg hover:scale-110 transition-transform"
                            onClick={handleDelete}
                            disabled={isUploading}
                        >
                            <Trash2 className="h-5 w-5" />
                        </Button>
                    )}
                </div>
                {!isUploading && !isDragging && (
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/20 px-2 py-1 rounded-full backdrop-blur-sm">
                        Cambiar foto
                    </span>
                )}
            </div>

            {isUploading && (
                <div className="absolute inset-0 rounded-full bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
            )}

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
