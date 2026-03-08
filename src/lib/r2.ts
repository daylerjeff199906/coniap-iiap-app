import { S3Client } from '@aws-sdk/client-s3'

export const R2_ACCOUNT_ID = process.env.CLOUDFLARE_R2_ACCOUNT_ID
export const R2_ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID
export const R2_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY
export const R2_BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME
export const R2_PUBLIC_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_URL
export const R2_ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME || !R2_PUBLIC_URL || !R2_ENDPOINT) {
    console.warn('⚠️ Cloudflare R2 environment variables are missing.')
}

export const r2Client = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID || '',
        secretAccessKey: R2_SECRET_ACCESS_KEY || '',
    },
})
