type DateFormats =
  | 'DD/MM/YYYY'
  | 'YYYY-MM-DD'
  | 'MM/YYYY'
  | 'DD/MM/YYYY Hora: HH:mm'

export function formatDate(dateString: string, format: DateFormats): string {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', String(year))
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
