export interface IPerson {
  id?: string
  name: string
  surName: string
  phone?: string
  job: string
  imageFile?: File
  image: string
  email: string
  location?: string
  presentation?: string
  institution?: string
  isActived?: boolean
  created_at: string
  typePerson: 'speaker' | 'speaker_mg' | 'participant'
}
