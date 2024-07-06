import { IPerson } from '../Person'

export interface IUser {
  id?: string
  created_at?: string
  userName: string
  email: string
  photo: string
  role: string[] | null
  person: IPerson | null
}

export interface IUserCreate {
  id?: string
  created_at?: string
  userName: string
  email: string
  photo: string
  role: string[] | null
  person: number | null
  password?: string
  password_confirmation?: string
}

export interface IUserCreated {
  id?: string
  userName: string
  email: string
  photo: string
  role: string[] | null
  person: number | null
}
