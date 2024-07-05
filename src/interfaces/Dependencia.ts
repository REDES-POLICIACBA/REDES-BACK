export default interface Dependencia {
  name: string
  address: string
  coordinates: {
    latitude: number
    longitude: number
  }
  linkType: string
  firewall: string
  ipInside: string
  ipOutside: string
  referencia: string
}
