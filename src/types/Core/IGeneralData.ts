export interface IGeneralData {
  description: string
  c_organizador: IPersonComite[]
  c_cientifico: IPersonComite[]
  c_informatica: IPersonComite[]
  format_summary: string
}

export interface IPersonComite {
  order: number
  name: string
}
