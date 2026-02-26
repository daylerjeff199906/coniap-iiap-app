import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/supabase/middleware';

const handleI18nRouting = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  // Handle i18n routing
  const response = handleI18nRouting(request);

  // Update Supabase session
  // Note: we pass the request to updateSession, which might modify the response cookies
  // return await updateSession(request);
  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Match root
    '/',
    // Match locales
    '/(es|en)/:path*',
    // Match all except static files
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)'
  ]
};
