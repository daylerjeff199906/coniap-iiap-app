import { IEvent } from '@/types'
export interface IProgram {
  id: string
  date: string
  title?: string
  shortDescription?: string
  banner?: string
  isActived?: boolean
  events: IEvent[]
}

export interface IProgramsFilter {
  query?: string
  column?: string
  date?: string
  page?: number
  limit?: number
  isPagination?: boolean
  orderBy?: {
    column: 'created_at' | 'date'
    ascending: boolean
  }
}
