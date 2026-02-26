import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Providers } from '@/app/providers';
import { Navbar } from '@/components/Navbar';
import 'filepond/dist/filepond.min.css';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        <Navbar />
                        {children}
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
