import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper';
import { PageHeader } from '@/components/general/PageHeader';
import { SubmissionsFilters } from './components/SubmissionsFilters';
import { SubmissionsDashboard } from './components/SubmissionsDashboard';
import { getSubmissions, getEventsList, getEditionsList } from './actions';
import { EventSubmission } from '@/types/submissions';

export const metadata = {
    title: 'Trabajos y Resúmenes - Panel',
};

export default async function SubmissionsPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string; eventId?: string; editionId?: string; status?: string }>
}) {
    const sParams = await searchParams;
    const searchQuer = sParams.q || '';
    const eventId = sParams.eventId || '';
    const editionId = sParams.editionId || '';
    const status = sParams.status || '';

    // Carga paralela de filtros y submissions
    const [events, allEditions] = await Promise.all([
        getEventsList(),
        getEditionsList()
    ]);

    const submissions = await getSubmissions({
        eventId: eventId || undefined,
        editionId: editionId || undefined,
        status: status || undefined,
        q: searchQuer || undefined
    });

    // Filtrar ediciones por evento si existe
    const filteredEditions = eventId
        ? allEditions.filter((e: any) => e.main_event_id === eventId)
        : allEditions;

    return (
        <LayoutWrapper sectionTitle="Gestión de Trabajos">
            <div className="flex flex-col gap-6">
                <PageHeader
                    title="Administrador General de Trabajos"
                    description="Revisa y gestiona postulaciones a través de todos los eventos y ediciones."
                    className="mb-2"
                />

                <div className="flex flex-col gap-2">
                    <SubmissionsFilters
                        events={events as any}
                        editions={filteredEditions as any}
                    />
                    <SubmissionsDashboard submissions={submissions as EventSubmission[]} />
                </div>
            </div>
        </LayoutWrapper>
    );
}
