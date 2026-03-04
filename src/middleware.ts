import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
    // 1. Handle i18n routing first
    const response = handleI18nRouting(request);

    // 2. Update Supabase session, passing the i18n response
    // return await updateSession(request, response as any);
    return response;
}

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match root
        '/',
        // Match locales
        '/(es|en)/:path*',
        // Match all except static files, api, etc.
        // Match all except static files, api, etc.
        '/((?!api|_next|_static|_vercel|.*\\..*).*)'
    ]
};
