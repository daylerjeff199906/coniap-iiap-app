export interface ISpeaker {
  id: string
  fullName: string
  surName: string
  job: string
  image: string
  email: string
  location?: string
  presentation?: string
  institution?: string
  levelStudy?: string
  isActive?: boolean
  file?: File
}
