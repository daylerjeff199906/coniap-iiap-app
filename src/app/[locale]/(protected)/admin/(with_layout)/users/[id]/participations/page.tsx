import { createClient } from '@/utils/supabase/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { UserLayout } from '../../components/UserLayout';
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getProfileById } from '../../actions';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, Download, Calendar, ShieldCheck, Link2 } from 'lucide-react';

interface ParticipationsPageProps {
    params: Promise<{
        id: string;
        locale: string;
    }>;
}

interface Participation {
    id: string;
    main_event_id: string | null;
    edition_id: string | null;
    status: string | null;
    main_events: { name: string } | null;
    editions: { name: string; year: number } | null;
    roles: { name: string } | null;
}

interface SubmissionFile {
    id: string;
    file_name: string;
    file_url: string;
    document_type: string | null;
}

interface Submission {
    id: string;
    title: string;
    status: string | null;
    is_admin_upload: boolean | null;
    created_at: string | null;
    main_events: { name: string } | null;
    editions: { name: string } | null;
    event_calls: { title: string } | null;
    files: SubmissionFile[];
}

export default async function UserParticipationsPage({ params }: ParticipationsPageProps) {
    const { id, locale } = await params;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const profile = await getProfileById(id);
    if (!profile) notFound();

    const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Usuario';

    const getTranslated = (val: any) => {
        if (!val) return '';
        if (typeof val === 'object') {
            return val[locale] || val['es'] || val['en'] || '';
        }
        return val;
    };

    // 1. Participaciones

    const { data: participationsRaw } = await supabase
        .from('event_participants')
        .select(`
            id,
            main_event_id,
            edition_id,
            status,
            main_events:main_event_id ( name ),
            editions:edition_id ( name, year ),
            roles:role_id ( name )
        `)
        .eq('profile_id', id);

    const participations = (participationsRaw as unknown as Participation[]) || [];

    // 2. Trabajos / Subvenciones
    const { data: submissionsRaw } = await supabase
        .from('event_submissions')
        .select(`
            id,
            title,
            status,
            is_admin_upload,
            created_at,
            main_events:main_event_id ( name ),
            editions:edition_id ( name ),
            event_calls:call_id ( title ),
            files:submission_files ( id, file_name, file_url, document_type )
        `)
        .eq('profile_id', id)
        .order('created_at', { ascending: false });

    const submissions = (submissionsRaw as unknown as Submission[]) || [];

    return (
        <div className="bg-slate-50/30 -mx-4 -mt-4 md:-mx-6 md:-mt-4 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
            <UserLayout userId={id} userName={userName}>
                <div className="space-y-6">
                    {/* 🏆 Eventos y Ediciones */}
                    <Card className="shadow-none border-slate-200">
                        <CardHeader className="p-4 bg-slate-50/50 border-b">
                            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-primary" /> Eventos & Inscripciones
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {participations.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {participations.map((item) => (
                                        <div key={item.id} className="border border-slate-100 rounded-xl p-3.5 bg-white shadow-sm flex flex-col justify-between hover:border-slate-200 transition-colors">
                                            <div>
                                                <div className="flex justify-between items-start">
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                        {item.editions ? 'Edición de Evento' : 'Evento General'}
                                                    </span>
                                                    <Badge variant={item.status === 'active' ? 'default' : 'secondary'} className="text-[9px] px-1 h-4">
                                                        {item.status === 'active' ? 'Activo' : item.status}
                                                    </Badge>
                                                </div>
                                                <h4 className="font-bold text-slate-800 text-sm mt-1 leading-snug">
                                                    {getTranslated(item.editions?.name) || getTranslated(item.main_events?.name) || 'Inscripción sin nombre'}
                                                </h4>
                                                {item.editions?.year && (
                                                    <p className="text-xs text-muted-foreground mt-0.5">Año: {item.editions.year}</p>
                                                )}
                                            </div>
                                            <div className="mt-3 pt-2.5 border-t border-slate-50 flex items-center gap-1.5">
                                                <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
                                                <span className="text-xs font-medium text-slate-600">Rol:</span>
                                                <Badge className="bg-slate-100 text-slate-800 border-none px-1.5 py-0.5 text-xs shadow-none cursor-default font-semibold capitalize">
                                                    {getTranslated(item.roles?.name) || 'Participante'}
                                                </Badge>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-muted-foreground text-center py-4">No se registran participaciones activas en eventos.</p>
                            )}
                        </CardContent>
                    </Card>

                    {/* 📄 Trabajos y Documentos Subidos */}
                    <Card className="shadow-none border-slate-200">
                        <CardHeader className="p-4 bg-slate-50/50 border-b">
                            <CardTitle className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <FileText className="h-4 w-4 text-primary" /> Trabajos Presentados
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            {submissions.length > 0 ? (
                                <Accordion type="single" collapsible className="w-full space-y-2">
                                    {submissions.map((sub) => (
                                        <AccordionItem key={sub.id} value={sub.id} className="border border-slate-200 rounded-xl px-4 bg-white overflow-hidden shadow-none">
                                            <AccordionTrigger className="hover:no-underline py-3">
                                                <div className="flex flex-col items-start text-left gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-slate-800 text-sm leading-tight">{sub.title}</h4>
                                                        {sub.is_admin_upload && (
                                                            <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[9px] h-4 py-0 px-1 hover:bg-amber-50 shadow-none">Admin</Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-[10px] text-slate-400">
                                                        Perteneciente a: {getTranslated(sub.event_calls?.title) || getTranslated(sub.editions?.name) || getTranslated(sub.main_events?.name) || 'General'}
                                                    </p>

                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className="pt-1 pb-3 space-y-3">
                                                <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-100 space-y-2">
                                                    <h5 className="text-[10px] uppercase font-bold text-slate-500">Documentos Asociados</h5>
                                                    {sub.files && sub.files.length > 0 ? (
                                                        <div className="grid gap-1.5">
                                                            {sub.files.map((file) => (
                                                                <div key={file.id} className="flex items-center justify-between p-2 bg-white border border-slate-100 rounded-lg shadow-none">
                                                                    <div className="flex items-center gap-2 min-w-0">
                                                                        <FileText className="h-4 w-4 text-slate-400 flex-none" />
                                                                        <div className="min-w-0">
                                                                            <p className="text-xs font-medium text-slate-700 truncate max-w-[200px] md:max-w-xs" title={file.file_name}>
                                                                                {file.file_name}
                                                                            </p>
                                                                            {file.document_type && (
                                                                                <Badge variant="outline" className="text-[8px] py-0 px-1 font-medium text-slate-400 capitalize h-3.5 mt-0.5">{file.document_type}</Badge>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-1 flex-none">
                                                                        {file.file_url.startsWith('http') ? (
                                                                            <a href={file.file_url} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-slate-100 rounded-md text-slate-500 hover:text-primary transition-colors">
                                                                                <Download className="h-3.5 w-3.5" />
                                                                            </a>
                                                                        ) : (
                                                                            <Badge variant="outline" className="text-[9px]"><Link2 className="h-2.5 w-2.5 mr-0.5" /> Link</Badge>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-[11px] text-muted-foreground italic">No hay archivos cargados para este trabajo.</p>
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            ) : (
                                <p className="text-xs text-muted-foreground text-center py-4">No se registran trabajos presentados.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </UserLayout>
        </div>
    )
}
