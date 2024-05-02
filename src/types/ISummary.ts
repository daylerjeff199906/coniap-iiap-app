import { ITopic } from '.'
import { IPerson } from './IPersons'

export interface ISummary {
  id: string
  person_id: string
  person?: IPerson | null
  topic?: ITopic
  topic_id: string
  created_at: string
  isActived: boolean
  isApproved: boolean
  file: string
  title: string
}
