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
import { UserLayout } from '../components/UserLayout'
import { IEducation, IEmploymentHistory, ICertification, ILanguage } from '@/types/profile'

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
    let education: IEducation[] = []
    let experience: IEmploymentHistory[] = []
    let certifications: ICertification[] = []
    let languages: ILanguage[] = []

    if (profile.auth_id) {
        [education, experience, certifications, languages] = await Promise.all([
            getProfileEducation(profile.auth_id),
            getProfileExperience(profile.auth_id),
            getProfileCertifications(profile.auth_id),
            getProfileLanguages(profile.auth_id)
        ])
    }


    const userName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'Usuario'

    return (
        <LayoutWrapper sectionTitle="Perfil de Usuario">
            <div className="bg-slate-50/30 -mx-4 -mt-4 md:-mx-6 md:-mt-4 p-4 md:p-6 lg:p-8 min-h-[calc(100vh-64px)]">
                <UserLayout userId={id} userName={userName}>
                    <ProfileDetail
                        profile={profile}
                        topics={topics || []}
                        education={education}
                        experience={experience}
                        certifications={certifications}
                        languages={languages}
                    />
                </UserLayout>
            </div>
        </LayoutWrapper>
    )
}

