export interface IEvent {
  id: string
  name: string
  timeStart: string
  timeEnd: string
  date?: string
  shortDescription?: string
  place: string
  banner?: string
  images: string[]
  sala: string
  linkZoom?: string
  linkYoutube?: string
  linkFacebook?: string
  customContent?: string
  idProgram?: string
  inProgram?: boolean
  idTypeEvent?: string
}
