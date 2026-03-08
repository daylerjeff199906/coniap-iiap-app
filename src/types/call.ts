export interface ICall {
    id: string;
    main_event_id: string | null;
    edition_id: string | null;
    role_id: string;
    title: string;
    description: string | null;
    start_date: string;
    end_date: string;
    max_capacity: number | null;
    form_schema: any;
    auto_approve: boolean;
    is_active: boolean;
    created_at: string;
    content: any; // EditorJS JSON structure
    // Joined data
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
    participant_roles?: {
        id: string;
        name: {
            es: string;
            en: string;
        };
        slug: string;
        badge_color: string | null;
    };
}
