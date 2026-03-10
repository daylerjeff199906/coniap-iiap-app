import { getSponsorsLinked } from './actions'
import { SponsorCard } from './components/SponsorCard'
import { PageHeader } from '@/components/general/PageHeader'
import { IconMoodSad } from '@tabler/icons-react'
import { getEditionsByEventList } from '@/app/[locale]/(protected)/admin/participants/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddSponsorButton } from './components/AddSponsorButton'

export default async function EventSponsorsPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ editionId?: string }>
}) {
    const { id: eventId } = await params
    const sParams = await searchParams
    const editions = await getEditionsByEventList(eventId)

    // We'll manage multiple tabs if there are editions
    // Tab 1: Global Sponsors (Main Event)
    // Tab 2...N: Edition Sponsors

    const mainEventSponsors = await getSponsorsLinked(eventId, false)

    return (
        <div className="flex flex-col gap-6 pt-4 px-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <PageHeader
                    title="Gestión de Sponsors"
                    description="Administra los patrocinadores vinculados a este evento y sus diferentes ediciones."
                    className="-mt-2"
                />
            </div>

            <Tabs defaultValue="global" className="w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/20 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <TabsList className="bg-transparent h-auto p-0 flex-wrap justify-start gap-1">
                        <TabsTrigger
                            value="global"
                            className="rounded-xl px-4 py-2 text-[13px] font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700"
                        >
                            Evento Global
                        </TabsTrigger>
                        {editions.map(edition => (
                            <TabsTrigger
                                key={edition.id}
                                value={edition.id}
                                className="rounded-xl px-4 py-2 text-[13px] font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm border border-transparent data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-700"
                            >
                                {edition.year}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="mt-6">
                    <TabsContent value="global" className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        <SponsorListSection
                            targetId={eventId}
                            isEdition={false}
                        />
                    </TabsContent>

                    {editions.map(edition => (
                        <TabsContent key={edition.id} value={edition.id} className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SponsorListSection
                                targetId={edition.id}
                                isEdition={true}
                            />
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </div>
    )
}

async function SponsorListSection({ targetId, isEdition }: { targetId: string, isEdition: boolean }) {
    const linkedSponsors = await getSponsorsLinked(targetId, isEdition)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <div className="flex flex-col">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                        {linkedSponsors.length} Sponsors Vinculados
                    </h3>
                </div>
                {/* We use a client component for the trigger since it has state */}
                <AddSponsorButton targetId={targetId} isEdition={isEdition} />
            </div>

            {linkedSponsors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {linkedSponsors.map(link => (
                        <SponsorCard
                            key={link.id}
                            link={link}
                            isEdition={isEdition}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 px-4 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/10">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                        <IconMoodSad size={32} strokeWidth={1.5} className="text-slate-400" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-700 dark:text-slate-200">Sin sponsors vinculados</h4>
                    <p className="text-sm text-slate-500 text-center max-w-xs mt-1 mb-6">
                        No hay patrocinadores registrados para este nivel. Añade uno para que aparezca en el sitio web.
                    </p>
                    <AddSponsorButton targetId={targetId} isEdition={isEdition} variant="outline" />
                </div>
            )}
        </div>
    )
}
