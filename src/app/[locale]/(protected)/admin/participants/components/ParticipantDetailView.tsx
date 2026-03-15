'use client'

import { Badge } from '@/components/ui/badge'
import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    IconChevronLeft,
    IconUser,
    IconMail,
    IconBuilding,
    IconCalendarEvent,
    IconTrophy,
    IconClipboardCheck,
    IconExternalLink,
    IconFileText,
    IconLayoutGrid,
    IconUsers,
    IconTrash,
    IconEdit,
    IconShieldCheck,
    IconAlertTriangle,
} from '@tabler/icons-react'
import { Link, useRouter } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { useState, useTransition } from 'react'
import { deleteParticipantRegistration } from '../actions'
import { toast } from 'react-toastify'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface ParticipantDetailViewProps {
    participant: {
        id: string
        registration_type?: string
        created_at: string
        profiles?: {
            id: string
            first_name: string | null
            last_name: string | null
            email: string | null
            avatar_url: string | null
            institution?: string | null
            bio?: string | null
            phone?: string | null
        }
        participant_roles?: {
            id: string
            name: { es: string; en: string }
            slug: string
            badge_color: string | null
            description?: string | null
        }
        main_events?: {
            id: string
            name: string
            slug: string
        }
        editions?: {
            id: string
            name: { es: string; en: string }
            year: number
        } | null
    }
    submissions?: any[]
}

const FUTURE_MODULES = [
    {
        icon: IconFileText,
        label: 'Resúmenes y Ponencias',
        description: 'Gestión de trabajos académicos enviados por el participante.',
        color: 'text-violet-500',
        bg: 'bg-violet-50',
        border: 'border-violet-100'
    },
    {
        icon: IconLayoutGrid,
        label: 'Materiales & Archivos',
        description: 'Presentaciones, certificados y documentos adjuntos.',
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-100'
    },
    {
        icon: IconUsers,
        label: 'Grupos & Sesiones',
        description: 'Asignación a talleres, mesas de trabajo o sesiones específicas.',
        color: 'text-emerald-500',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100'
    },
]

export function ParticipantDetailView({ participant, submissions }: ParticipantDetailViewProps) {
    const locale = useLocale()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const { profiles: profile, participant_roles: role, main_events: event, editions: edition } = participant

    const fullName = `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() || 'Sin nombre'
    const initials = fullName.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
    const roleName = locale === 'es' ? role?.name?.es : role?.name?.en
    const isManual = participant.registration_type !== 'convocatoria'

    const formattedDate = new Date(participant.created_at).toLocaleDateString(
        locale === 'es' ? 'es-ES' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
    )

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteParticipantRegistration(participant.id)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Registro eliminado correctamente')
                router.push('/admin/participants')
            }
        })
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* ── HEADER ── */}
            <div className="flex items-center gap-4 mb-8">
                <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="rounded-full hover:bg-slate-100 shrink-0"
                >
                    <Link href="/admin/participants">
                        <IconChevronLeft size={22} />
                    </Link>
                </Button>
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl font-bold tracking-tight truncate">{fullName}</h1>
                    <p className="text-sm text-muted-foreground">Ficha de participante — Registro #{participant.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl gap-2 h-9 opacity-50 cursor-not-allowed text-xs"
                        disabled
                    >
                        <IconEdit size={14} />
                        Editar
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="rounded-xl gap-2 h-9 text-red-600 border-red-200 hover:bg-red-50 text-xs"
                                disabled={isPending}
                            >
                                <IconTrash size={14} />
                                Eliminar
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-2xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="flex items-center gap-2">
                                    <IconAlertTriangle size={20} className="text-red-500" />
                                    ¿Eliminar registro?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción eliminará el registro de <strong>{fullName}</strong> del evento <strong>{event?.name}</strong>. El perfil del participante no se eliminará. Esta acción no se puede deshacer.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={handleDelete}
                                    className="bg-red-600 hover:bg-red-700 rounded-xl"
                                >
                                    Sí, eliminar registro
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ── LEFT SIDEBAR ── */}
                <div className="lg:col-span-1 flex flex-col gap-5">
                    {/* Profile card */}
                    <div className="bg-white rounded-2xl border shadow-sm p-6 sticky top-24">
                        <div className="flex flex-col items-center text-center mb-6">
                            <Avatar className="h-20 w-20 border-4 border-white shadow-md mb-4">
                                <AvatarImage src={profile?.avatar_url || ''} alt={fullName} />
                                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-100 to-slate-200 text-slate-600">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="font-bold text-lg leading-tight">{fullName}</h2>
                            {profile?.institution && (
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <IconBuilding size={11} />
                                    {profile.institution}
                                </p>
                            )}
                            {role && (
                                <Badge
                                    className="mt-3 text-[10px] px-2.5 py-0.5 shadow-none font-semibold"
                                    style={{
                                        backgroundColor: role.badge_color ? `${role.badge_color}18` : '#f1f5f9',
                                        color: role.badge_color || '#475569',
                                        borderColor: role.badge_color ? `${role.badge_color}30` : '#e2e8f0'
                                    }}
                                    variant="outline"
                                >
                                    {roleName}
                                </Badge>
                            )}
                        </div>

                        <div className="space-y-3 text-xs border-t pt-4">
                            {profile?.email && (
                                <div className="flex items-center gap-2.5">
                                    <IconMail size={13} className="text-muted-foreground shrink-0" />
                                    <span className="truncate text-foreground">{profile.email}</span>
                                </div>
                            )}
                            {profile?.phone && (
                                <div className="flex items-center gap-2.5">
                                    <span className="text-muted-foreground text-[10px] shrink-0">📞</span>
                                    <span>{profile.phone}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2.5">
                                <IconCalendarEvent size={13} className="text-muted-foreground shrink-0" />
                                <span className="text-muted-foreground">Registrado: {formattedDate}</span>
                            </div>
                        </div>

                        <div className="mt-5 pt-4 border-t">
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-full rounded-xl text-xs gap-2 opacity-40 cursor-not-allowed"
                                disabled
                            >
                                Ver Perfil Completo
                                <IconExternalLink size={12} />
                            </Button>
                            <p className="text-[9px] text-center text-muted-foreground mt-2 italic">Módulo de perfiles próximamente</p>
                        </div>
                    </div>
                </div>

                {/* ── MAIN CONTENT ── */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* ── SECTION 1: Asignación al Evento ── */}
                    <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 p-5 border-b bg-slate-50/50">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                <IconTrophy size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[15px]">Asignación al Evento</h3>
                                <p className="text-[11px] text-muted-foreground">Evento y rol asignado a este participante.</p>
                            </div>
                        </div>
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] uppercase font-bold tracking-wide text-muted-foreground">Evento Principal</span>
                                <div className="flex items-start gap-2">
                                    <IconCalendarEvent size={15} className="text-blue-500 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-semibold text-sm">{event?.name || '—'}</p>
                                        {edition && (
                                            <p className="text-xs text-muted-foreground">
                                                {locale === 'es' ? edition.name.es : edition.name.en} · {edition.year}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <span className="text-[10px] uppercase font-bold tracking-wide text-muted-foreground">Rol Designado</span>
                                <div className="flex items-center gap-2">
                                    {role ? (
                                        <>
                                            <div
                                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                                style={{ backgroundColor: role.badge_color || '#94a3b8' }}
                                            />
                                            <div>
                                                <p className="font-semibold text-sm">{roleName}</p>
                                                {role.description && (
                                                    <p className="text-xs text-muted-foreground">{role.description}</p>
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <span className="text-sm text-muted-foreground">Sin rol asignado</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── SECTION 2: Datos Personales / Bio ── */}
                    {(profile?.bio || profile?.institution) && (
                        <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                            <div className="flex items-center gap-3 p-5 border-b bg-slate-50/50">
                                <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                                    <IconUser size={18} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[15px]">Información Profesional</h3>
                                    <p className="text-[11px] text-muted-foreground">Datos biográficos e institucionales del participante.</p>
                                </div>
                            </div>
                            <div className="p-5 grid gap-4">
                                {profile.institution && (
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wide text-muted-foreground mb-1.5">Institución</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <IconBuilding size={14} className="text-muted-foreground shrink-0" />
                                            <span>{profile.institution}</span>
                                        </div>
                                    </div>
                                )}
                                {profile.bio && (
                                    <div>
                                        <p className="text-[10px] uppercase font-bold tracking-wide text-muted-foreground mb-1.5">Reseña Biográfica</p>
                                        <p className="text-sm text-foreground/80 leading-relaxed bg-slate-50 rounded-xl p-4 border border-slate-100">
                                            {profile.bio}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* ── SECTION 3: Origen del Registro ── */}
                    <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 p-5 border-b bg-slate-50/50">
                            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                                <IconClipboardCheck size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[15px]">Origen del Registro</h3>
                                <p className="text-[11px] text-muted-foreground">Trazabilidad de cómo ingresó este participante al evento.</p>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className={`flex items-start gap-3 p-4 rounded-xl border ${isManual ? 'bg-blue-50/50 border-blue-100' : 'bg-emerald-50/50 border-emerald-100'}`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isManual ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-700'}`}>
                                    {isManual ? <IconShieldCheck size={16} /> : <IconClipboardCheck size={16} />}
                                </div>
                                <div>
                                    <p className="font-semibold text-sm">{isManual ? 'Registro Manual (Admin)' : 'Convocatoria / Postulación'}</p>
                                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                                        {isManual
                                            ? 'Este participante fue registrado directamente por un administrador del sistema.'
                                            : 'Este participante se inscribió a través de un proceso de convocatoria oficial y fue aprobado.'}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-2">Fecha de registro: {formattedDate}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ── SECTION 4: Historial de Participaciones y Trabajos ── */}
                    <section className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                        <div className="flex items-center gap-3 p-5 border-b bg-slate-50/50">
                            <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                                <IconFileText size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[15px]">Historial de Trabajos y Resúmenes</h3>
                                <p className="text-[11px] text-muted-foreground">Trabajos académicos y documentos enviados por el participante.</p>
                            </div>
                        </div>
                        <div className="p-5 space-y-4">
                            {participant.registration_type === 'convocatoria' && (
                                <Alert className="bg-emerald-50/50 border-emerald-100 flex items-start gap-2 p-3 text-xs text-emerald-800">
                                    <IconClipboardCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                                    <span>Este participante ha respondido a una convocatoria oficial para este evento.</span>
                                </Alert>
                            )}

                            {submissions && submissions.length > 0 ? (
                                <div className="grid gap-3">
                                    {submissions.map((sub: any) => (
                                        <div key={sub.id} className="border rounded-xl p-4 hover:bg-slate-50/50 transition-colors">
                                            <div className="flex justify-between items-start gap-3">
                                                <div>
                                                    <h4 className="font-semibold text-sm text-slate-800 leading-snug">{sub.title}</h4>
                                                    <p className="text-[10px] text-muted-foreground mt-1">
                                                        {sub.main_events?.name || sub.editions?.name?.[locale] || 'Evento general'}
                                                    </p>
                                                </div>
                                                <Badge className="text-[10px] px-2 py-0.5 shadow-none font-medium capitalize">
                                                    {sub.status}
                                                </Badge>
                                            </div>
                                            
                                            {sub.files && sub.files.length > 0 && (
                                                <div className="mt-3 pt-3 border-t border-dashed space-y-1.5">
                                                    {sub.files.map((file: any) => (
                                                        <div key={file.id} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-lg">
                                                            <div className="flex items-center gap-2">
                                                                <IconFileText size={14} className="text-primary" />
                                                                <span className="font-medium text-slate-700 truncate max-w-[200px]">{file.file_name}</span>
                                                                {file.document_type && (
                                                                    <Badge variant="outline" className="text-[9px] px-1 shadow-none text-muted-foreground">
                                                                        {file.document_type}
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-primary hover:underline">
                                                                <IconExternalLink size={12} /> Descargar
                                                            </a>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center border-2 border-dashed rounded-xl border-slate-200">
                                    <IconFileText size={32} className="mx-auto text-slate-300 mb-2" />
                                    <p className="text-sm font-medium text-slate-500">Sin trabajos adjuntos</p>
                                    <p className="text-xs text-slate-400 mt-1">El participante no ha registrado o enviado resúmenes aún.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
