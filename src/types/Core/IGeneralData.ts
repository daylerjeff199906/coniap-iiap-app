export interface IGeneralData {
  description: string
  c_organizador: IPersonComite[]
  c_cientifico: IPersonComite[]
  c_informatica: IPersonComite[]
  format_summary: IFormatSummary
}

export interface IPersonComite {
  order: number
  name: string
}

export interface IFormatSummary {
  name: string
  url: string
}
