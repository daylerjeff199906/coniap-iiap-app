export function convertDate(dateString: string): string {
  const date = new Date(dateString)
  const formattedDate = `${date.getDate()}/ ${
    date.getMonth() + 1
  }/${date.getFullYear()} Hora: ${date.getHours()}:${date.getMinutes()}`
  return formattedDate
}
