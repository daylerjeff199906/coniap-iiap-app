import { Navbar, Footer } from '@/components';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}
