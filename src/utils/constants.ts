const isProd = typeof window !== 'undefined'
    ? window.location.hostname.includes('iiap.gob.pe')
    : process.env.NEXT_PUBLIC_APP_URL?.includes('iiap.gob.pe');

export const PLATFORM_URL = isProd 
    ? 'https://auth.iiap.gob.pe' 
    : 'http://localhost:3004';

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
