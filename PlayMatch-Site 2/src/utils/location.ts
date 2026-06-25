import { RIO_NEIGHBORHOODS } from '../data/rioNeighborhoods'

function toRad(deg: number) {
  return (deg * Math.PI) / 180
}

export function getDistanceKm(fromNeighborhood: string, toNeighborhood: string): number {
  const from = RIO_NEIGHBORHOODS.find((n) => n.name === fromNeighborhood)
  const to = RIO_NEIGHBORHOODS.find((n) => n.name === toNeighborhood)

  if (!from || !to) return Infinity

  const R = 6371
  const dLat = toRad(to.lat - from.lat)
  const dLng = toRad(to.lng - from.lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) * Math.sin(dLng / 2) ** 2

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function formatDistance(km: number): string {
  if (!Number.isFinite(km)) return ''
  if (km < 1) return `${Math.round(km * 1000)} m`
  return `${km.toFixed(1)} km`
}

export function extractNeighborhoodFromLocation(location: string): string | null {
  for (const { name } of RIO_NEIGHBORHOODS) {
    if (location.includes(name)) return name
  }
  return null
}

export function formatUserLocation(neighborhood: string, city: string) {
  return `${neighborhood}, ${city}`
}

export function buildMatchLocation(venue: string, neighborhood: string, city: string) {
  return `${venue} — ${neighborhood}, ${city}`
}
