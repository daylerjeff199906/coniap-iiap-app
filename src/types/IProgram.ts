import { IEvent } from './IEvent'
export interface IProgram {
  id: string
  date: string
  title?: string
  shortDescription?: string
  banner?: string
  isActived?: boolean
  events: IEvent[]
}
