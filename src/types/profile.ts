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
