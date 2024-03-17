export interface IEvent {
  id: string
  hourStart: string
  hourEnd: string
  date?: string
  name: string
  shortDescription?: string
  description: string
  location: string
  banner?: string
  image: string[]
  linkZoom?: string
  linkYoutube?: string
  linkFacebook?: string
  body?: string
  inProgram?: boolean
  sala: string
}
