import { IPerson, IPersonExcel } from '@/types'
import { getTypePerson } from '../../core'
import { convertDate } from '@/utils/functions'

export function convertListPersonToExcel(dataList: IPerson[]) {
  return dataList?.map((person) => {
    return {
      id: String(person.id),
      nombres: String(person.name),
      apellidos: String(person.surName),
      celular: String(person.phone),
      ocupacion: String(person.job) || 'No especificado',
      email: String(person.email),
      pais: String(person.location) || 'No especificado',
      institution: person.institution || 'No especificado',
      estado: person.isActived ? 'Activo' : 'Inactivo',
      'fecha de creacion': convertDate(person.created_at),
      rol: getTypePerson(person.typePerson),
    }
  })
}
