import { IEvent } from './IEvent'
export interface IProgram {
  id: number
  date: string
  title?: string
  banner?: string
  events: IEvent[]
}
