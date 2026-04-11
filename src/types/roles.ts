export interface IRole {
    id: string
    name: string
    description?: string
    created_at: string
}

export interface IUserRole {
    id: string
    profile_id: string
    role_id: string
    module_id: string | null
    assigned_at: string
    assigned_by?: string
    roles?: IRole
    modules?: {
        id: string
        name: string
    }
}
