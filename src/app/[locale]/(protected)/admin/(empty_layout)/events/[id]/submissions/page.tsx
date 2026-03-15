import { getSubmissions, getEditionsByEvent } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/actions';
import { SubmissionsDashboard } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/components/SubmissionsDashboard';
import { SubmissionsFilters } from '@/app/[locale]/(protected)/admin/(with_layout)/submissions/components/SubmissionsFilters';

interface EventSubmissionsPageProps {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ q?: string; editionId?: string; status?: string }>;
}

export default async function EventSubmissionsPage({ params, searchParams }: EventSubmissionsPageProps) {
    const { id } = await params;
    const sParams = await searchParams;
    const editionId = sParams.editionId || '';
    const status = sParams.status || '';
    const q = sParams.q || '';

    const [editions, submissions] = await Promise.all([
        getEditionsByEvent(id),
        getSubmissions({
            eventId: id,
            editionId: editionId || undefined,
            status: status || undefined,
            q: q || undefined
        })
    ]);

    return (
        <div className="flex flex-col gap-6 w-full pt-4">
            <div className="flex flex-col gap-1 -mt-2 mb-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-800 leading-tight flex items-center gap-2">
                    Trabajos y Resúmenes Académicos
                </h1>
                <p className="text-xs text-muted-foreground">
                    Lista de abstracts y documentos subidos para este evento.
                </p>
            </div>

            <SubmissionsFilters events={[]} editions={editions} />
            <SubmissionsDashboard submissions={submissions as any} />
        </div>
    );
}
