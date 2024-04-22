const urlApi = 'https://restcountries.com/v3.1'
interface IProps {
  query?: string
  date?: string
}

export async function fetchCountries(props: IProps) {
  const { query } = props
  const res = await fetch(`${urlApi}/name/${query}?fullText=false`)
  return res
}

export async function fetchAllCountries() {
  const res = await fetch(`${urlApi}/all`)
  return res
}
