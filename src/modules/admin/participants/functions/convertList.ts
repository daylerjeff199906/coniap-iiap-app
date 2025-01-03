import { IEvent, IPerson, ISummary } from '@/types'
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
      'fecha de creacion': formatDate(
        summary.created_at,
        'DD/MM/YYYY Hora: HH:mm'
      ),
      titulo: String(summary.title),
      'linea-tematica':
        String(summary.topic?.name.toUpperCase()) ||
        'No tiene temática asignada',
      nombre: String(summary.person?.name.toUpperCase()),
      apellidos: String(summary.person?.surName.toUpperCase()),
      email: String(summary.person?.email),
      telefono: String(summary.person?.phone) || 'No registrado',
      institucion:
        summary.person?.institution?.toUpperCase() || 'No especificado',
      coautores: summary.authors,
      estado: summary.isApproved ? 'Activo' : 'Inactivo',
      aprobado: summary.isApproved ? 'Sí' : 'No',
      link: summary.file || 'No tiene archivo',
    }
  })
}

export function convertListEventsToExcel(dataList: IEvent[]) {
  return dataList?.map((event) => {
    return {
      id: String(event.id),
      'fecha de creacion': formatDate(
        event.created_at.toString(),
        'DD/MM/YYYY Hora: HH:mm'
      ),
      nombre: String(event.name.toUpperCase()),
      'linea-tematica':
        String(event.summary?.topic?.name.toUpperCase()) ||
        'No tiene temática asignada',
      fecha: event.date,
      hora_inicio: event.timeStart,
      hora_fin: event.timeEnd,
      persona_nombre: event.summary?.person?.name.toUpperCase(),
      persona_apellidos: event.summary?.person?.surName.toUpperCase(),
      sala: event.sala?.name.toUpperCase(),
      email: event.summary?.person?.email,
      institucion: event.summary?.person?.institution,
      estado: event.isActived ? 'Activo' : 'Inactivo',
    }
  })
}
