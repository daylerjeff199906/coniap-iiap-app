import { IProgram, ISala } from '..'
import { ISummary } from '../ISummary'

export interface IEvent {
  id: string
  //   summary_id: string | null
  //   program_id: string | null
  program: IProgram | null
  summary?: ISummary | null
  sala: ISala | null
  //observar
  isActived: boolean
  name: string
  timeStart: string
  timeEnd: string
  date: string | null
  shortDescription: string
  banner: string
  customContent: string
  //delete
  created_at: Date
  //For labels
  program_name: string
  summary_name: string
  sala_name: string
}
