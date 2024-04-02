export function formatDateToDDMMM(dateString: string): string {
  const months = [
    'ENE',
    'FEB',
    'MAR',
    'ABR',
    'MAY',
    'JUN',
    'JUL',
    'AGO',
    'SEP',
    'OCT',
    'NOV',
    'DIC',
  ]

  const [year, monthIndexStr, day] = dateString.split('-')
  const monthIndex = parseInt(monthIndexStr, 10) - 1
  const month = months[monthIndex]

  return `${parseInt(day).toString().padStart(2, '0')} ${month}`
}
