import { ISummary } from './ISummary'

export interface IEvent {
  id: string
  summary_id: string | null
  program_id: string | null
  summary?: ISummary | null
  //observar
  sala: string | number | null
  isActived: boolean
  name: string
  timeStart: string
  timeEnd: string
  date: string | null
  shortDescription: string
  banner: string
  linkZoom: string
  linkYoutube: string
  linkFacebook: string
  customContent: string
  //delete
  created_at: Date
}
