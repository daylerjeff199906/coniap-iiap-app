export interface IGeneralData {
  description: string
  c_organizador: IPersonComite[]
  c_cientifico: IPersonComite[]
  c_informatica: IPersonComite[]
  format_summary: string
  facebook_url?: string
  instagram_url?: string
  youtube_url?: string
  linkedin_url?: string
}

export interface IPersonComite {
  order: number
  name: string
}
