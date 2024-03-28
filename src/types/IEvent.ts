import { IPerson } from '.'
export interface IEvent {
  id: string
  program_id: string
  //observar
  person: IPerson | null
  sala: string
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
  idProgram: string
  inProgram: boolean
  idTypeEvent: string
  created_at: Date
}
