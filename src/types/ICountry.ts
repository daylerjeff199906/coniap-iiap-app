export interface ICountry {
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
