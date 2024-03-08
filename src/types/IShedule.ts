import { IProgram } from './IProgram'
export interface ISchedule {
  id: number
  date: string
  title: string
  banner: string
  programs: IProgram[]
}
