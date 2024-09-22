type DateFormats =
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'MM/YYYY'
  | 'DD/MM/YYYY Hora: HH:mm'

export function formatDate(dateString: string, format: DateFormats): string {
  // Crear la fecha a partir del dateString
  const date = new Date(dateString)

  // Asegurarse de convertir la fecha a la zona horaria de Lima, Perú
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Lima',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Para formato de 24 horas
  }

  // Obtener la fecha y hora formateadas en la zona horaria de Perú
  const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date)

  // Separar la parte de la fecha y la hora
  const [datePart, timePart] = formattedDate.split(', ')
  const [day, month, year] = datePart.split('/')
  const [hours, minutes] = timePart.split(':')

  // Reemplazar los valores en el formato solicitado
  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', year)
    .replace('HH', hours)
    .replace('mm', minutes)
}

export function formatDateLarge(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day + 1)) // Usamos Date.UTC para evitar el problema de la zona horaria
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }
  return date
    .toLocaleDateString('es-ES', options)
    .toUpperCase()
    .replace('.', '')
}
