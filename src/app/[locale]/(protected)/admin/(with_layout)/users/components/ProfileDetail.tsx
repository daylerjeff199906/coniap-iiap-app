'use client'

import React, { useState, useTransition } from 'react'
import { IProfile, IEducation, IEmploymentHistory, ICertification, ILanguage } from '@/types/profile'
import { ITopic } from '@/types/ITopics'
import { AvatarUpload } from './AvatarUpload'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
    IconMail,
    IconPhone,
    IconMapPin,
    IconBuilding,
    IconSchool,
    IconBriefcase,
    IconLanguage,
    IconAward,
    IconCalendar,
    IconEdit,
    IconCheck,
    IconArrowLeft,
    IconExternalLink,
    IconUserCircle,
    IconLoader2,
    IconCake,
    IconUser
} from '@tabler/icons-react'
import { Link, useRouter } from '@/i18n/routing'
import { toast } from 'react-toastify'
import { updateProfilePersonal } from '../actions'
import { CountrySelect } from '@/components/general/Form/CountrySelect'
import countriesData from '@/utils/json/countries.json'

interface ProfileDetailProps {
    profile: IProfile
    topics?: ITopic[]
    education?: IEducation[]
    experience?: IEmploymentHistory[]
    certifications?: ICertification[]
    languages?: ILanguage[]
}

export function ProfileDetail({
    profile,
    topics = [],
    education = [],
    experience = [],
    certifications = [],
    languages = []
}: ProfileDetailProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const [formValues, setFormValues] = useState({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        bio: profile.bio || '',
        institution: profile.institution || '',
        location: profile.location || '',
        phone: profile.phone || '',
        dedication: profile.dedication || '',
    })

    const handleUpdate = async () => {
        startTransition(async () => {
            const result = await updateProfilePersonal(profile.id, formValues)
            if (result.success) {
                toast.success('Perfil actualizado correctamente')
                setIsEditing(false)
                router.refresh()
            } else {
                toast.error(result.error)
            }
        })
    }


    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header / Nav */}
            <div className="flex items-center justify-between mb-4">
                <Button variant="ghost" className="rounded-xl flex items-center gap-2 text-slate-500" asChild>
                    <Link href="/admin/users">
                        <IconArrowLeft size={18} />
                        Regresar
                    </Link>
                </Button>

                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    <IconUserCircle size={14} />
                    Detalle de Usuario
                </div>
            </div>

            {/* main Intro Card */}
            <Card className="rounded-3xl border-none shadow-xl shadow-slate-200/50 overflow-hidden bg-white">
                <div className="h-32 bg-gradient-to-r from-gray-400 to-gray-500 relative" />
                <CardContent className="px-8 pb-10 pt-0 relative -mt-12 flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col items-center md:items-start shrink-0">
                        <AvatarUpload
                            avatarUrl={profile.avatar_url}
                            firstName={profile.first_name || ''}
                            lastName={profile.last_name || ''}
                            profileId={profile.id}
                        />
                        <div className="mt-4 flex gap-2">
                            <Badge variant="outline" className={`rounded-xl border-white/20 px-3 py-1 text-[10px] font-bold ${profile.auth_id ? 'bg-emerald-500 text-white border-none' : 'bg-slate-200 text-slate-600 border-none'}`}>
                                {profile.auth_id ? 'CUENTA ACTIVA' : 'FAKE PROFILE'}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex-1 mt-14 md:mt-16 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                {isEditing ? (
                                    <div className="flex gap-2">
                                        <Input
                                            value={formValues.first_name}
                                            onChange={(e) => setFormValues(prev => ({ ...prev, first_name: e.target.value }))}
                                            placeholder="Nombres"
                                            className="font-bold text-2xl h-11 rounded-xl"
                                        />
                                        <Input
                                            value={formValues.last_name}
                                            onChange={(e) => setFormValues(prev => ({ ...prev, last_name: e.target.value }))}
                                            placeholder="Apellidos"
                                            className="font-bold text-2xl h-11 rounded-xl"
                                        />
                                    </div>
                                ) : (
                                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                                        {profile.first_name || profile.last_name ? `${profile.first_name || ''} ${profile.last_name || ''}` : 'No asignado o sin nombre'}
                                    </h1>
                                )}
                                <p className="text-slate-500 font-medium text-lg mt-1">{profile.email}</p>
                            </div>
                            <div className="flex items-center gap-2 justify-center shrink-0">
                                {isEditing ? (
                                    <>
                                        <Button variant="outline" className="rounded-xl px-6 font-semibold" onClick={() => setIsEditing(false)}>
                                            Cancelar
                                        </Button>
                                        <Button
                                            className="rounded-xl px-8 bg-black hover:bg-black/90 text-white font-bold flex items-center gap-2"
                                            onClick={handleUpdate}
                                            disabled={isPending}
                                        >
                                            {isPending ? <IconLoader2 className="h-4 w-4 animate-spin" /> : <IconCheck size={18} />}
                                            Guardar Cambios
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="rounded-xl px-6 bg-slate-900 hover:bg-black text-white font-bold flex items-center gap-2"
                                    >
                                        <IconEdit size={18} />
                                        Editar Perfil
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 mt-8 pb-6 border-b border-slate-100">
                            <InfoItem icon={IconBuilding} label="Institución">
                                {isEditing ? (
                                    <Input
                                        value={formValues.institution}
                                        onChange={(e) => setFormValues(prev => ({ ...prev, institution: e.target.value }))}
                                        className="h-9 rounded-lg text-sm"
                                    />
                                ) : (
                                    profile.institution || 'No especificado'
                                )}
                            </InfoItem>
                            <InfoItem icon={IconMapPin} label="Ubicación">
                                {isEditing ? (
                                    <CountrySelect
                                        value={formValues.location}
                                        onChange={(val) => setFormValues(prev => ({ ...prev, location: val }))}
                                        className="h-9 rounded-lg text-xs"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2">
                                        {profile.location && (
                                            <img
                                                src={countriesData.find(c => c.country === profile.location)?.flag}
                                                alt={profile.location}
                                                className="w-4 h-3 object-cover rounded-sm border border-slate-100"
                                            />
                                        )}
                                        {profile.location || 'No especificado'}
                                    </div>
                                )}
                            </InfoItem>
                            <InfoItem icon={IconPhone} label="Teléfono">
                                {isEditing ? (
                                    <Input
                                        value={formValues.phone}
                                        onChange={(e) => setFormValues(prev => ({ ...prev, phone: e.target.value }))}
                                        className="h-9 rounded-lg text-sm"
                                    />
                                ) : (
                                    profile.phone || 'No especificado'
                                )}
                            </InfoItem>
                            <InfoItem icon={IconBriefcase} label="Dedicación">
                                {isEditing ? (
                                    <Input
                                        value={formValues.dedication}
                                        onChange={(e) => setFormValues(prev => ({ ...prev, dedication: e.target.value }))}
                                        className="h-9 rounded-lg text-sm"
                                    />
                                ) : (
                                    profile.dedication || 'No especificado'
                                )}
                            </InfoItem>
                            <InfoItem icon={IconCalendar} label="Miembro desde">
                                {new Date(profile.created_at).toLocaleDateString()}
                            </InfoItem>
                            {profile.birth_date && (
                                <InfoItem icon={IconCake} label="Nacimiento">
                                    {new Date(profile.birth_date).toLocaleDateString()}
                                </InfoItem>
                            )}
                            {profile.sex && (
                                <InfoItem icon={IconUser} label="Género">
                                    {profile.sex === 'male' ? 'Masculino' : profile.sex === 'female' ? 'Femenino' : profile.sex}
                                </InfoItem>
                            )}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <IconEdit size={14} />
                                Biografía Personal
                            </h3>
                            {isEditing ? (
                                <Textarea
                                    value={formValues.bio}
                                    onChange={(e) => setFormValues(prev => ({ ...prev, bio: e.target.value }))}
                                    className="min-h-[120px] rounded-2xl bg-slate-50 border-slate-100 focus:bg-white p-4"
                                    placeholder="Cuéntanos un poco sobre ti..."
                                />
                            ) : (
                                <p className="text-slate-600 leading-relaxed max-w-2xl italic">
                                    {profile.bio || 'Este usuario aún no ha escrito una biografía.'}
                                </p>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* bottom LinkedIn-style Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Experiencia */}
                    <LinkedInSection title="Experiencia" icon={IconBriefcase}>
                        {experience.length > 0 ? experience.map((ex: IEmploymentHistory) => {
                            const startStr = ex.start_date ? new Date(ex.start_date).toLocaleDateString() : '?'
                            const endStr = ex.is_current ? 'Actualidad' : (ex.end_date ? new Date(ex.end_date).toLocaleDateString() : '?')
                            return (
                                <LinkedInItem
                                    key={ex.id}
                                    title={ex.role}
                                    subtitle={ex.organization}
                                    period={`${startStr} - ${endStr}`}
                                />
                            )
                        }) : (
                            <p className="text-sm text-slate-400 italic">No se ha registrado experiencia laboral.</p>
                        )}
                    </LinkedInSection>

                    {/* Educación */}
                    <LinkedInSection title="Educación" icon={IconSchool}>
                        {education.length > 0 ? education.map((ed: IEducation) => {
                            const startStr = ed.start_date ? new Date(ed.start_date).getFullYear() : '?'
                            const endStr = ed.is_current ? 'Presente' : (ed.end_date ? new Date(ed.end_date).getFullYear() : '?')
                            return (
                                <LinkedInItem
                                    key={ed.id}
                                    title={ed.degree || ed.title}
                                    subtitle={ed.institution}
                                    period={`${startStr} - ${endStr}`}
                                />
                            )
                        }) : (
                            <p className="text-sm text-slate-400 italic">No se ha registrado información académica.</p>
                        )}
                    </LinkedInSection>

                    {/* Actividades Profesionales / Certificaciones */}
                    <LinkedInSection title="Certificaciones" icon={IconAward}>
                        {certifications.length > 0 ? certifications.map((c: ICertification) => {
                            const dateStr = c.issue_date ? new Date(c.issue_date).toLocaleDateString() : '?'
                            return (
                                <LinkedInItem
                                    key={c.id}
                                    title={c.name}
                                    subtitle={c.issuing_organization}
                                    period={dateStr}
                                />
                            )
                        }) : (
                            <p className="text-sm text-slate-400 italic">No se han registrado certificaciones.</p>
                        )}
                    </LinkedInSection>
                </div>

                <div className="space-y-6">
                    {/* Idiomas */}
                    <LinkedInSection title="Idiomas" icon={IconLanguage}>
                        <div className="space-y-4">
                            {languages.length > 0 ? languages.map((l: ILanguage) => (
                                <div key={l.id} className="flex items-center justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                                    <span className="font-bold text-slate-800 text-sm">{l.language}</span>
                                    <Badge variant="outline" className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase rounded-lg">
                                        {l.level}
                                    </Badge>
                                </div>
                            )) : (
                                <p className="text-xs text-slate-400 italic">No especificado</p>
                            )}
                        </div>
                    </LinkedInSection>

                    {/* Intereses / Tags */}
                    <LinkedInSection title="Áreas de Interés" icon={IconCheck}>
                        <div className="flex flex-wrap gap-2">
                            {(profile.areas_of_interest && profile.areas_of_interest.length > 0) ? profile.areas_of_interest.map((tag: string) => {
                                const topic = topics.find((t: ITopic) => t.id.toString() === tag.toString());
                                const topicName = topic?.name || tag;
                                return (
                                    <Badge
                                        key={tag}
                                        className="rounded-xl px-3 py-1 text-[11px] font-bold lowercase border-none flex items-center gap-1.5"
                                        style={{
                                            backgroundColor: topic?.color ? `${topic.color}20` : '#ebf5ff',
                                            color: topic?.color || '#3b82f6'
                                        }}
                                    >
                                        #{topicName}
                                    </Badge>
                                )
                            }) : (
                                <span className="text-xs text-slate-400 italic">No especificado</span>
                            )}
                        </div>
                    </LinkedInSection>

                    {/* Expertise Areas */}
                    <LinkedInSection title="Áreas de Especialidad" icon={IconAward}>
                        <div className="flex flex-wrap gap-2">
                            {(profile.expertise_areas && profile.expertise_areas.length > 0) ? profile.expertise_areas.map((tag: string) => {
                                const topic = topics.find((t: ITopic) => t.id.toString() === tag.toString());
                                const topicName = topic?.name || tag;
                                return (
                                    <Badge
                                        key={tag}
                                        className="rounded-xl px-3 py-1 text-[11px] font-bold border-none flex items-center gap-1.5"
                                        style={{
                                            backgroundColor: topic?.color ? `${topic.color}15` : '#f0fdf4',
                                            color: topic?.color || '#10b981'
                                        }}
                                    >
                                        {topicName}
                                    </Badge>
                                )
                            }) : (
                                <span className="text-xs text-slate-400 italic">No especificado</span>
                            )}
                        </div>
                    </LinkedInSection>

                    {/* Research Interests */}
                    {profile.research_interests && (
                        <LinkedInSection title="Intereses de Investigación" icon={IconSchool}>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {profile.research_interests}
                            </p>
                        </LinkedInSection>
                    )}
                </div>
            </div>
        </div>
    )
}

function InfoItem({ icon: Icon, label, children }: { icon: any, label: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Icon size={12} className="text-slate-400" />
                {label}
            </span>
            <div className="text-slate-700 font-bold text-[13px] min-h-[1.2rem]">
                {children}
            </div>
        </div>
    )
}

function LinkedInSection({ title, icon: Icon, children }: { title: string, icon: any, children: React.ReactNode }) {
    return (
        <Card className="rounded-3xl border-slate-100/60 shadow-lg shadow-slate-100/50 bg-white">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center">
                        <Icon size={18} />
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <div className="mt-2 text-slate-600">
                    {children}
                </div>
            </CardContent>
        </Card>
    )
}

function LinkedInItem({ title, subtitle, period }: { title: string, subtitle: string, period: string }) {
    return (
        <div className="flex gap-4 mb-6 last:mb-0">
            <div className="w-12 h-12 rounded-lg bg-slate-50 text-slate-300 flex items-center justify-center shrink-0 border border-slate-100/50">
                <IconBuilding size={24} />
            </div>
            <div className="flex flex-col">
                <h4 className="font-bold text-slate-900 text-sm leading-tight">{title}</h4>
                <p className="text-slate-600 text-xs font-medium mt-0.5">{subtitle}</p>
                <p className="text-slate-400 text-[11px] mt-1 tabular-nums">{period}</p>
            </div>
        </div>
    )
}
