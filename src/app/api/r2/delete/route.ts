import { NextRequest, NextResponse } from 'next/server'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { r2Client, R2_BUCKET_NAME, R2_PUBLIC_URL } from '@/lib/r2'

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json()

        if (!url) {
            return NextResponse.json({ error: 'URL is required' }, { status: 400 })
        }

        // Extract key from URL
        // Example URL: https://.../products/filename.jpg
        // We need: products/filename.jpg

        let key = url
        if (url.startsWith(R2_PUBLIC_URL)) {
            key = url.replace(`${R2_PUBLIC_URL}/`, '')
        } else {
            // Fallback if the URL structure is different, try to get the path
            try {
                const urlObj = new URL(url)
                key = urlObj.pathname.substring(1) // remove leading /
            } catch (e) {
                // specific logic if relying on public url replacement fails
            }
        }

        console.log('Deleting from R2, key:', key)

        await r2Client.send(
            new DeleteObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: key
            })
        )

        return NextResponse.json({ message: 'File deleted successfully' })
    } catch (error) {
        console.error('Error deleting from R2:', error)
        return NextResponse.json(
            { error: 'Error deleting file' },
            { status: 500 }
        )
    }
}
