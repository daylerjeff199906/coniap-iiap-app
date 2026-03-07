import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Inter } from 'next/font/google';
import '../globals.css';
import { Providers } from '@/app/providers';
import 'filepond/dist/filepond.min.css';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title'),
        description: t('description'),
        icons: '/coniap.ico',
        openGraph: {
            title: t('title'),
            description: t('description'),
            images: [
                {
                    url: 'https://firebasestorage.googleapis.com/v0/b/coniap-iiap.appspot.com/o/logos%2Fmeta-coniap.webp?alt=media&token=1f0e7ef1-3ab3-479a-8e0e-dad09842e857',
                    width: 430,
                    height: 430,
                    alt: t('title'),
                },
            ],
        },
    };
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <Providers>
                        {children}
                    </Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
