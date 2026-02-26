import { Hero, AboutUsSection } from '@/components/sections/home'

export default function HomePage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <Hero />
            <AboutUsSection />

            {/* Add more sections here as they are developed */}
        </main>
    )
}
