import { IPerson } from '.'
export interface IIinscription {
  password: string
  password_confirmation: string
}

export interface IInscription extends IPerson, IIinscription {}
