import { Calendar, MapPin, Navigation, Users, Trophy, ArrowRight } from 'lucide-react'
import type { Match } from '../types/match'
import { formatDistance, getDistanceKm } from '../utils/location'
import Button from './Button'

interface MatchCardProps {
  match: Match
  userNeighborhood?: string
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + 'T12:00:00')
  return date.toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })
}

const levelColors: Record<string, string> = {
  Iniciante: 'bg-blue-100 text-blue-700',
  Intermediário: 'bg-amber-100 text-amber-700',
  Avançado: 'bg-red-100 text-red-700',
  'Todos os níveis': 'bg-primary-light text-primary-dark',
}

export default function MatchCard({ match, userNeighborhood }: MatchCardProps) {
  const filled = match.maxSpots - match.spots
  const distanceKm =
    userNeighborhood && match.neighborhood
      ? getDistanceKm(userNeighborhood, match.neighborhood)
      : null
  const isNearby = distanceKm !== null && distanceKm <= 5

  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-secondary/30 transition-all duration-200 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-secondary-light flex items-center justify-center">
            <Trophy size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="font-bold text-dark text-lg">{match.sport}</h3>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <span
                className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${levelColors[match.level] ?? 'bg-slate-100 text-slate-600'}`}
              >
                {match.level}
              </span>
              {distanceKm !== null && Number.isFinite(distanceKm) && (
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full ${isNearby ? 'bg-primary-light text-primary-dark' : 'bg-slate-100 text-slate-600'}`}
                >
                  <Navigation size={12} />
                  {formatDistance(distanceKm)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <ul className="space-y-2.5 mb-5 flex-1">
        <li className="flex items-center gap-2.5 text-sm text-slate-600">
          <MapPin size={16} className="text-secondary shrink-0" />
          <span className="line-clamp-2">{match.location}</span>
        </li>
        <li className="flex items-center gap-2.5 text-sm text-slate-600">
          <Calendar size={16} className="text-primary shrink-0" />
          <span>
            {formatDate(match.date)} às {match.time}
          </span>
        </li>
        <li className="flex items-center gap-2.5 text-sm text-slate-600">
          <Users size={16} className="text-primary shrink-0" />
          <span>
            {match.spots} {match.spots === 1 ? 'vaga' : 'vagas'} disponí
            {match.spots === 1 ? 'l' : 'is'} ({filled}/{match.maxSpots} jogadores)
          </span>
        </li>
      </ul>

      <Button to={`/partidas/${match.id}`} variant="primary" size="sm" fullWidth>
        Ver detalhes
        <ArrowRight size={16} />
      </Button>
    </article>
  )
}

export { formatDate }
