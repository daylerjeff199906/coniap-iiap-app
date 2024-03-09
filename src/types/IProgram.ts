import { IEvent } from './IEvent'
export interface IProgram {
  id: string
  date: string
  title?: string
  banner?: string
  events: IEvent[]
}
