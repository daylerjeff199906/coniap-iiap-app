import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2Client, R2_BUCKET_NAME, R2_PUBLIC_URL } from '@/lib/r2'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get('file') as File
        const folder = (formData.get('folder') as string) || 'uploads'

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
        }

        const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if (!validTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only images are allowed.' },
                { status: 400 }
            )
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const fileExtension = file.name.split('.').pop()
        const fileName = `${folder}/${uuidv4()}.${fileExtension}`

        const uploadParams = {
            Bucket: R2_BUCKET_NAME,
            Key: fileName,
            Body: buffer,
            ContentType: file.type,
            ACL: 'public-read' // Check if R2 supports ACLs or if bucket policy is used
        }

        // @ts-ignore - ACL type mismatch issue in some versions, safe to ignore for basic usage
        await r2Client.send(new PutObjectCommand(uploadParams))
        const url = `${R2_PUBLIC_URL}/${fileName}`

        return NextResponse.json({ url })
    } catch (error) {
        console.error('Error uploading to R2:', error)
        return NextResponse.json(
            { error: 'Error uploading file' },
            { status: 500 }
        )
    }
}
