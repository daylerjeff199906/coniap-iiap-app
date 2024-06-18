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
