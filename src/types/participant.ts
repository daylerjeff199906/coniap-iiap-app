export interface IParticipantRole {
    id: string;
    slug: string;
    name: {
        es: string;
        en: string;
    };
    badge_color: string | null;
    is_active: boolean;
    created_at: string;
}

export interface IParticipantProfile {
    id: string;
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
    institution?: string | null;
    presentation?: string | null;
}

export interface IParticipant {
    id: string;
    main_event_id: string | null;
    edition_id: string | null;
    profile_id: string;
    role_id: string;
    registration_type?: string;
    created_at: string;
    // Joined data
    profiles?: IParticipantProfile;
    participant_roles?: IParticipantRole;
    main_events?: {
        name: string;
    };
    editions?: {
        name: {
            es: string;
            en: string;
        };
        year: number;
    };
}
