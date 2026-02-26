export interface ISocialNetworks {
    facebook: string;
    instagram: string;
    linkedin: string;
    youtube: string;
}

export interface IGlobalSettings {
    id: number;
    app_name: string;
    social_networks: ISocialNetworks;
    format_summary_url: string;
    updated_at: string;
}

export interface IPage {
    id: string;
    slug: string;
    name: {
        es: string;
        en: string;
    };
    is_active: boolean;
    order_index: number;
}

export interface IDynamicSection<T = any> {
    id: string;
    page_slug: string;
    component_type: string;
    order_index: number;
    content: T;
    is_active: boolean;
    created_at: string;
}

// Specific content content for 'about_with_tabs'
export interface IAboutWithTabsContent {
    intro: {
        subtitle: string;
        content: string;
        image_url: string;
    };
    tabs: {
        mission: {
            content: string;
            image_url: string;
        };
        vision: {
            content: string;
            image_url: string;
        };
        leadership: {
            content: string;
            image_url: string;
        };
    };
}
