import proxy from './proxy';

export default proxy;

export const config = {
    // Match only internationalized pathnames
    matcher: [
        // Match root
        '/',
        // Match locales
        '/(es|en)/:path*',
        // Match all except static files, api, etc.
        '/((?!api|_next|_static|_vercel|.*\\..*).*)'
    ]
};
