export interface IProfile {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    created_at: string;
    bio: string | null;
    onboarding_completed: boolean | null;
    birth_date: string | null;
    dedication: string | null;
    areas_of_interest: string[] | null;
    expertise_areas: string[] | null;
    research_interests: string | null;
    phone: string | null;
    location: string | null;
    institution: string | null;
    updated_at: string | null;
    avatar_url: string | null;
    social_links: any[] | null;
    additional_emails: any[] | null;
    sex: string | null;
    auth_id: string | null;
}

export interface IEducation {
    id: string
    user_id: string
    institution: string
    city?: string | null
    region_state?: string | null
    country?: string | null
    title: string
    field_of_study?: string | null
    status: string
    start_date?: string | null
    end_date?: string | null
    is_current: boolean
    degree?: string | null
    is_favorite: boolean
}

export interface IEmploymentHistory {
    id: string
    user_id: string
    organization: string
    city?: string | null
    region_state?: string | null
    country?: string | null
    department?: string | null
    role: string
    start_date: string
    end_date?: string | null
    is_current: boolean
    is_favorite: boolean
}

export interface ICertification {
    id: string
    user_id: string
    name: string
    issuing_organization: string
    issue_date: string
    expiration_date?: string | null
    credential_id?: string | null
    credential_url?: string | null
    is_favorite: boolean
}

export interface ILanguage {
    id: string
    user_id: string
    language: string
    level: string
    is_native: boolean
    is_favorite?: boolean | null
}
