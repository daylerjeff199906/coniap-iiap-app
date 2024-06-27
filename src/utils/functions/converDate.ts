export function convertDate(dateString: string): string {
  const date = new Date(dateString)
  const formattedDate = `Fecha: ${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()} Hora: ${date.getHours()}:${date.getMinutes()}`
  return formattedDate
}
