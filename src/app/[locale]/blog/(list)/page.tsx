import { fetchDynamicSectionsByPage } from '@/api/cms'

export default async function BlogPage() {
    const sections = await fetchDynamicSectionsByPage('blog')

    return (
        <main className="bg-white">
            {sections?.map((section) => {
                // Future expansion: render dynamic components based on type
                return null;
            })}
            {/* Here you can add static list components for blog posts */}
        </main>
    )
}
