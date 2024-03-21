export interface IEvent {
  id: string
  isActived: boolean
  name: string
  timeStart: string
  timeEnd: string
  date?: string
  shortDescription?: string
  place: string
  banner?: string
  images: string[]
  salaId: string
  linkZoom?: string
  linkYoutube?: string
  linkFacebook?: string
  customContent?: string
  idProgram?: string
  inProgram?: boolean
  idTypeEvent?: string
}
