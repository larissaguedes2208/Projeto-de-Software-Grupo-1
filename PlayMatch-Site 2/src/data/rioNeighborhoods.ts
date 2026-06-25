export interface Neighborhood {
  name: string
  lat: number
  lng: number
}

export const DEFAULT_CITY = 'Rio de Janeiro, RJ'

export const RIO_NEIGHBORHOODS: Neighborhood[] = [
  { name: 'Centro', lat: -22.9068, lng: -43.1729 },
  { name: 'Copacabana', lat: -22.9711, lng: -43.1822 },
  { name: 'Ipanema', lat: -22.9844, lng: -43.203 },
  { name: 'Leblon', lat: -22.9874, lng: -43.2234 },
  { name: 'Botafogo', lat: -22.9519, lng: -43.1824 },
  { name: 'Flamengo', lat: -22.927, lng: -43.1765 },
  { name: 'Laranjeiras', lat: -22.934, lng: -43.1788 },
  { name: 'Catete', lat: -22.9258, lng: -43.1762 },
  { name: 'Glória', lat: -22.921, lng: -43.1765 },
  { name: 'Maracanã', lat: -22.9121, lng: -43.2298 },
  { name: 'Tijuca', lat: -22.9289, lng: -43.2333 },
  { name: 'Barra da Tijuca', lat: -23.0067, lng: -43.3653 },
  { name: 'Recreio dos Bandeirantes', lat: -23.0247, lng: -43.4562 },
  { name: 'Jardim Botânico', lat: -22.9669, lng: -43.2247 },
  { name: 'Lagoa', lat: -22.975, lng: -43.211 },
  { name: 'Santa Teresa', lat: -22.9203, lng: -43.1865 },
  { name: 'Meier', lat: -22.902, lng: -43.278 },
  { name: 'Madureira', lat: -22.8708, lng: -43.341 },
  { name: 'Niterói — Icaraí', lat: -22.9039, lng: -43.1082 },
  { name: 'Niterói — São Francisco', lat: -22.9025, lng: -43.0912 },
]

export const NEIGHBORHOOD_NAMES = RIO_NEIGHBORHOODS.map((n) => n.name)
