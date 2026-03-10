'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useLocale } from 'next-intl'
import { IconLoader2 } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

interface RoleChangeModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (roleId: string) => Promise<void>
    currentRoleId: string
    roles: any[]
    userName: string
}

export function RoleChangeModal({
    isOpen,
    onClose,
    onConfirm,
    currentRoleId,
    roles,
    userName
}: RoleChangeModalProps) {
    const locale = useLocale()
    const [selectedRoleId, setSelectedRoleId] = useState(currentRoleId)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleConfirm = async () => {
        setIsSubmitting(true)
        try {
            await onConfirm(selectedRoleId)
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[420px] rounded-2xl border-slate-200 shadow-xl p-6 bg-white gap-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-slate-900">
                        Cambiar rol
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 font-medium text-[13px] mt-1">
                        Selecciona el rol para <span className="text-slate-900">{userName}</span> en este evento.
                    </DialogDescription>
                </DialogHeader>

                <RadioGroup
                    value={selectedRoleId}
                    onValueChange={setSelectedRoleId}
                    className="grid gap-2"
                >
                    {roles.map((role) => {
                        const name = locale === 'es' ? role.name?.es : role.name?.en
                        const isSelected = selectedRoleId === role.id

                        return (
                            <div key={role.id}>
                                <RadioGroupItem
                                    value={role.id}
                                    id={role.id}
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor={role.id}
                                    className={cn(
                                        "flex flex-col gap-0.5 p-3 rounded-xl border transition-all cursor-pointer",
                                        isSelected
                                            ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                                            : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                                    )}
                                >
                                    <span className="text-[13px] font-medium">
                                        {name || role.slug}
                                    </span>
                                    {role.description && (
                                        <span className={cn(
                                            "text-[11px] leading-tight",
                                            isSelected ? "text-slate-300" : "text-slate-400"
                                        )}>
                                            {locale === 'es' ? role.description?.es : role.description?.en}
                                        </span>
                                    )}
                                </Label>
                            </div>
                        )
                    })}
                </RadioGroup>

                <DialogFooter className="gap-2 sm:justify-end mt-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-xl font-medium text-slate-600 border-slate-200 h-10 px-4"
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        className="rounded-xl bg-slate-900 hover:bg-black text-white font-medium h-10 px-5 transition-all flex items-center gap-2"
                        disabled={isSubmitting || selectedRoleId === currentRoleId}
                    >
                        {isSubmitting && <IconLoader2 size={16} className="animate-spin" />}
                        Guardar cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
