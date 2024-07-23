export interface IGeneralData {
  description: string
  c_organizador: IPersonComite[]
  c_cientifico: IPersonComite[]
  c_informatica: IPersonComite[]
}

export interface IPersonComite {
  order: number
  name: string
}
