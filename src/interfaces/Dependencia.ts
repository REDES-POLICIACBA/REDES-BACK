export default interface Dependencia {
    name: string
    address: string
    coordinates?:
        | {
              latitude: string
              longitude: string
          }
        | null
        | undefined
    linkType: string
    firewall: string
    ipInside: string
    ipOutside: string
    referencia?: string | null
    type: 'capital' | 'interior'
}
