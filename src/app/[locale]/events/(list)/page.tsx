import { fetchDynamicSectionsByPage } from '@/api/cms'

export default async function EventsPage() {
    const sections = await fetchDynamicSectionsByPage('events')

    return (
        <main className="bg-white">
            {sections?.map((section) => {
                return null;
            })}
        </main>
    )
}
