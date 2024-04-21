const urlApi = 'https://restcountries.com/v3.1/name/'
interface IProps {
  query?: string
  date?: string
}

export async function fetchCountries(props: IProps) {
  const { query } = props
  const res = await fetch(`${urlApi}${query}?fullText=false`)
  return res
}
