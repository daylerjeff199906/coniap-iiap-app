export const PLATFORM_URL = 'https://herp-science-platform-bio-intranet.vercel.app';

export const TRACKING_PARAMS = {
    source: 'coniap',
    event: 'CONIAP_2024',
    edition: '3',
    type: 'convocatoria'
};

export const getTrackingParamsString = () => {
    const params = new URLSearchParams(TRACKING_PARAMS);
    return `?${params.toString()}`;
};

export const getExternalLoginUrl = (locale: string = 'es') => {
    const nextPath = `/${locale}/dashboard${getTrackingParamsString()}`
    return `${PLATFORM_URL}/${locale}/login?next=${encodeURIComponent(nextPath)}`
}
