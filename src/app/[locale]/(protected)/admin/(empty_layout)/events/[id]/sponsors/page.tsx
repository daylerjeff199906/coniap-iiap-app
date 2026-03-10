import { getSponsorsLinked } from './actions'
import { PageHeader } from '@/components/general/PageHeader'
import { getEditionsByEventList } from '@/app/[locale]/(protected)/admin/participants/actions'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddSponsorButton } from './components/AddSponsorButton'
import { SponsorListWrapper } from './components/SponsorListWrapper'

export default async function EventSponsorsPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ editionId?: string }>
}) {
    const { id: eventId } = await params
    const editions = await getEditionsByEventList(eventId)

    return (
        <div className="flex flex-col gap-6 pt-4 px-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <PageHeader
                    title="Sponsors"
                    description="Administra y ordena los patrocinadores de este evento."
                    className="-mt-2"
                />
            </div>

            <Tabs defaultValue="global" className="w-full">
                <div className="flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/20 p-2 rounded-2xl border border-slate-100 dark:border-slate-800">
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
                        <SponsorSection
                            targetId={eventId}
                            isEdition={false}
                        />
                    </TabsContent>

                    {editions.map(edition => (
                        <TabsContent key={edition.id} value={edition.id} className="m-0 space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <SponsorSection
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

async function SponsorSection({ targetId, isEdition }: { targetId: string, isEdition: boolean }) {
    const linkedSponsors = await getSponsorsLinked(targetId, isEdition)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
                <h3 className="text-[12px] font-bold text-slate-500 uppercase tracking-widest">
                    {linkedSponsors.length} Patrocinadores vinculados
                </h3>
                <AddSponsorButton targetId={targetId} isEdition={isEdition} alreadyLinkedIds={linkedSponsors.map(l => l.sponsor_id.toString())} />
            </div>

            <SponsorListWrapper
                initialSponsors={linkedSponsors}
                isEdition={isEdition}
            />
        </div>
    )
}
