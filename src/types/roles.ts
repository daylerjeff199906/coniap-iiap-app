export interface IRole {
    id: string
    name: string
    description?: string
    created_at: string
}

export interface IUserRole {
    profile_id: string
    role_id: string
    assigned_at: string
    assigned_by?: string
    roles?: IRole
}
