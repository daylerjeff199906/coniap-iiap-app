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

export function convertToDateWithTime(dateString: string): string {
  return formatDate(dateString, 'DD/MM/YYYY Hora: HH:mm')
}

export function convertToISODate(dateString: string): string {
  return formatDate(dateString, 'YYYY-MM-DD')
}

export function convertToMonthYear(dateString: string): string {
  return formatDate(dateString, 'MM/YYYY')
}
