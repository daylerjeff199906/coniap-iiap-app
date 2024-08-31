import { IPerson, ISummary } from '@/types'
import { getTypePerson } from '../../core'
import { formatDate } from '@/utils/functions'

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
      'fecha de creacion': formatDate(
        person.created_at,
        'DD/MM/YYYY Hora: HH:mm'
      ),
      rol: getTypePerson(person.typePerson),
    }
  })
}

export function convertListSummaryToExcel(dataList: ISummary[]) {
  return dataList?.map((summary) => {
    return {
      id: String(summary.id),
      titulo: String(summary.title),
      'linea-tematica':
        String(summary.topic?.name) || 'No tiene temática asignada',
      nombre: String(summary.person?.name),
      apellidos: String(summary.person?.surName),
      email: String(summary.person?.email),
      telefono: String(summary.person?.phone) || 'No registrado',
      institucion: summary.person?.institution || 'No especificado',
      coautores: summary.authors,
      estado: summary.isApproved ? 'Activo' : 'Inactivo',
      aprobado: summary.isApproved ? 'Sí' : 'No',
      'fecha de creacion': formatDate(
        summary.created_at,
        'DD/MM/YYYY Hora: HH:mm'
      ),
    }
  })
}
