export interface IEvent {
  id: string
  name: string
  hourStart: string
  hourEnd: string
  date?: string
  shortDescription?: string
  location: string
  banner?: string
  image: string[]
  sala: string
  linkZoom?: string
  linkYoutube?: string
  linkFacebook?: string
  description: string
  body?: string
  idProgram?: string
  inProgram?: boolean
  idTypeEvent?: string
}
