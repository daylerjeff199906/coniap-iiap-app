import { fetchDynamicSectionsByPage } from '@/api/cms'

export default async function SpeakersPage() {
    const sections = await fetchDynamicSectionsByPage('speakers')

    return (
        <main className="bg-white">
            {sections?.map((section) => {
                return null;
            })}
        </main>
    )
}
