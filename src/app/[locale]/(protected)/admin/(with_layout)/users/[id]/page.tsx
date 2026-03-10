import {
    getProfileById,
    getProfileEducation,
    getProfileExperience,
    getProfileCertifications,
    getProfileLanguages
} from '../actions'
import { ProfileDetail } from '../components/ProfileDetail'
import { notFound } from 'next/navigation'
import { LayoutWrapper } from '@/components/panel-admin/layout-wrapper'
import { fetchActiveTopics } from '@/api/fetchTopics'

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

    const topics = await fetchActiveTopics()

    // Fetch professional/academic data if auth_id exists
    let education: any[] = []
    let experience: any[] = []
    let certifications: any[] = []
    let languages: any[] = []

    if (profile.auth_id) {
        [education, experience, certifications, languages] = await Promise.all([
            getProfileEducation(profile.auth_id),
            getProfileExperience(profile.auth_id),
            getProfileCertifications(profile.auth_id),
            getProfileLanguages(profile.auth_id)
        ])
    }

    return (
        <LayoutWrapper sectionTitle="Perfil de Usuario">
            <div className="bg-slate-50/30 -mx-4 -mt-4 md:-mx-6 md:-mt-4 p-4 md:p-6 lg:p-8">
                <ProfileDetail
                    profile={profile}
                    topics={topics || []}
                    education={education}
                    experience={experience}
                    certifications={certifications}
                    languages={languages}
                />
            </div>
        </LayoutWrapper>
    )
}
