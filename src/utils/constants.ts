export const PLATFORM_URL = 'https://herp-science-platform-bio-intranet.vercel.app';

/**
 * Builds the direct URL to a convocatoria page on the external platform.
 * e.g. https://platform.com/es/dashboard/convocatorias/[callId]
 */
export const getConvocatoriaUrl = (locale: string, callId: string) => {
    return `${PLATFORM_URL}/${locale}/dashboard/convocatorias/${callId}`
}

/**
 * Builds the login URL redirecting to a specific path after authentication.
 */
export const getExternalLoginUrl = (locale: string = 'es', nextPath?: string) => {
    const defaultNext = `/${locale}/dashboard`
    const next = nextPath || defaultNext
    return `${PLATFORM_URL}/${locale}/login?next=${encodeURIComponent(next)}`
}

/**
 * Builds the signup URL redirecting to a specific path after registration.
 */
export const getExternalSignupUrl = (locale: string = 'es', nextPath?: string) => {
    const defaultNext = `/${locale}/dashboard`
    const next = nextPath || defaultNext
    return `${PLATFORM_URL}/${locale}/signup?next=${encodeURIComponent(next)}`
}
