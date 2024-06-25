interface IProps {
  start: string
  end: string
}

export function formatConferenceDate(dateConference: IProps): string {
  // Extraer las fechas de inicio y fin
  const { start, end } = dateConference

  // Obtener el día de inicio y fin en UTC
  const startDay = new Date(start).getUTCDate()
  const endDay = new Date(end).getUTCDate()

  // Obtener el mes y el año de la fecha de inicio (sin ajustar la zona horaria)
  const month = new Date(start).toLocaleString('default', { month: 'long' })
  const year = new Date(start).getFullYear()

  // Formatear y devolver la cadena
  return `Del ${startDay} al ${endDay} de ${month} ${year}`
}
