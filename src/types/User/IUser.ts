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
