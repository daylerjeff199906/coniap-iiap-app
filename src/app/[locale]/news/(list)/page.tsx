import { fetchDynamicSectionsByPage } from '@/api/cms'

export default async function NewsPage() {
    const sections = await fetchDynamicSectionsByPage('news')

    return (
        <main className="bg-white">
            {sections?.map((section) => {
                return null;
            })}
        </main>
    )
}
