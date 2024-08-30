import { IPerson, ITopic } from '@/types'

export interface ISummary {
  id: string
  person_id: string
  person?: IPerson | null
  topic?: ITopic
  topic_id: string
  created_at: string
  isActived: boolean
  isApproved: boolean
  isExternal: boolean
  isMagistral: boolean
  file: string
  title: string
  authors: string[] | null
}

export interface ISummaryFilter {
  query?: string
  isApproved?: boolean
  isActived?: boolean
  isMagistral?: boolean
  person_id?: string
  topic_id?: string
  created_at?: string
  isFile?: boolean
}
