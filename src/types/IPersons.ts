// export enum PersonType {
//   SPEAKER = 'speaker',
//   SPEAKER_MG = 'speaker_mg',
//   PARTICIPANT = 'participant',
// }

export interface IPerson {
  id: string
  name: string
  surName: string
  job: string
  image: string
  email: string
  location?: string
  presentation?: string
  institution?: string
  // levelStudy?: string
  isActived?: boolean
  created_at: string
  file_resumen?: string | null
  typePerson: 'speaker' | 'speaker_mg' | 'participant'
}
