import { getProfileById } from '../actions'
import { ProfileDetail } from '../components/ProfileDetail'
import { notFound } from 'next/navigation'

interface ProfilePageProps {
    params: Promise<{
        id: string
        locale: string
    }>
}

export default async function ProfileDetailPage({ params }: ProfilePageProps) {
    const { id } = await params
    const profile = await getProfileById(id)

    if (!profile) {
        notFound()
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 bg-slate-50/30">
            <ProfileDetail profile={profile} />
        </div>
    )
}
