import { IPerson } from './IPersons'

export interface ISummary {
  id: string
  created_at: string
  person_id: IPerson
  event_id: string
  isActived: boolean
  isApproved: boolean
  file: string
  title: string
}
