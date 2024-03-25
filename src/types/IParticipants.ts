export interface IParticipants {
  id: string
  name: string
  surName: string
  job: string
  image: string
  email: string
  location?: string
  institution?: string
  //   presentation?: string
  file?: File
  isActived?: boolean
  isSpeaker?: boolean
  isMasterly?: boolean
}
