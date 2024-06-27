export function convertDate(dateString: string): string {
  const date = new Date(dateString)
  const formattedDate = `F:${
    date.getMonth() + 1
  }-${date.getDate()}-${date.getFullYear()} H:${date.getHours()}:${date.getMinutes()}`
  return formattedDate
}
