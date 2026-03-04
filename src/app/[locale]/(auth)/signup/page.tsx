import { SignupForm } from '@/components';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function SignupPage() {
    const t = await getTranslations('Auth');
    return (
        <div className="mx-auto grid gap-6 w-full max-w-sm">
            <div className="grid gap-2 text-center">
                <h1 className="text-2xl font-bold">{t('signup')}</h1>
                <p className="text-muted-foreground text-sm">
                    {t('signupDescription')}
                </p>
            </div>
            <SignupForm />
            <div className="text-center text-sm">
                {t('alreadyHaveAccount')}{" "}
                <Link href="/login" className="underline text-primary">
                    {t('logIn')}
                </Link>
            </div>
        </div>
    )
}
