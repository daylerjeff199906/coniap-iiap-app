import { getSubmissionById } from '../actions'
import { ReviewSubmissionClient } from './components/ReviewSubmissionClient'
import { notFound } from 'next/navigation'

export const metadata = {
    title: 'Revisión de Trabajo - Panel',
}

export default async function ReviewSubmissionPage({ 
    params 
}: { 
    params: Promise<{ id: string }> 
}) {
    const { id } = await params
    const submission = await getSubmissionById(id)
    if (!submission) notFound()

    return <ReviewSubmissionClient submission={submission as any} />
}
