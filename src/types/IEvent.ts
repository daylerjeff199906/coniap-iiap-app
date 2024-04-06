import { IPerson } from '.'
export interface IEvent {
  id: string
  program_id: string
  person_id: string
  //observar
  persons: IPerson | null
  sala: string | number
  isActived: boolean
  name: string
  timeStart: string
  timeEnd: string
  date: string
  shortDescription: string
  banner: string
  linkZoom: string
  linkYoutube: string
  linkFacebook: string
  customContent: string
  //delete
  created_at: Date
}
