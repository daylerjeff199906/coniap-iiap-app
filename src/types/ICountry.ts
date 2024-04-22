export interface ICountry {
  cca2: number
  name: {
    common: string
    official: string
  }
  flags: {
    alt: string
    svg: string
    png: string
  }
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
}
