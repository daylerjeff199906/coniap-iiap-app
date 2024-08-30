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

interface ConferenceDates {
  summary: {
    start: string
    end: string
  }
  'date-conference': {
    start: string
    end: string
  }
}

interface ConferenceStatus {
  isBeforeConference: boolean
  isBeforeSummary: boolean
  isAfterConference: boolean
}

export function getConferenceStatus(dates: ConferenceDates): ConferenceStatus {
  // Fecha actual
  const dateNow = new Date()

  // Fechas relevantes
  const conferenceStart = new Date(dates['date-conference'].start)
  const conferenceEnd = new Date(dates['date-conference'].end)
  const summaryEnd = new Date(dates.summary.end)

  // Evaluaciones
  const isBeforeConference = dateNow < conferenceStart
  const isBeforeSummary = dateNow < summaryEnd
  const isAfterConference = dateNow > conferenceEnd

  // Devolvemos el estado
  return {
    isBeforeConference,
    isBeforeSummary,
    isAfterConference,
  }
}
