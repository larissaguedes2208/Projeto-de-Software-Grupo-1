import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MapPin, Search, Filter, Navigation } from 'lucide-react'
import MatchCard from '../components/MatchCard'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useMatches } from '../context/MatchesContext'
import type { SkillLevel, Match } from '../types/match'
import { getDistanceKm, formatUserLocation } from '../utils/location'

const sports = [
  'Todos',
  'Futebol',
  'Vôlei',
  'Basquete',
  'Tênis',
  'Beach Tennis',
  'Futevôlei',
  'Corrida',
]

const levels: (SkillLevel | 'Todos')[] = [
  'Todos',
  'Iniciante',
  'Intermediário',
  'Avançado',
  'Todos os níveis',
]

function applyFilters(
  matches: Match[],
  search: string,
  sportFilter: string,
  levelFilter: string,
) {
  return matches.filter((m) => {
    const matchesSearch =
      search === '' ||
      m.sport.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase()) ||
      m.neighborhood.toLowerCase().includes(search.toLowerCase())

    const matchesSport = sportFilter === 'Todos' || m.sport === sportFilter
    const matchesLevel = levelFilter === 'Todos' || m.level === levelFilter

    return matchesSearch && matchesSport && matchesLevel
  })
}

export default function MatchesPage() {
  const location = useLocation()
  const { user, isLoggedIn } = useAuth()
  const { matches } = useMatches()
  const [search, setSearch] = useState('')
  const [sportFilter, setSportFilter] = useState('Todos')
  const [levelFilter, setLevelFilter] = useState<(typeof levels)[number]>('Todos')
  const [sortByDistance, setSortByDistance] = useState(true)

  const justRegistered =
    (location.state as { justRegistered?: boolean } | null)?.justRegistered === true

  const filtered = useMemo(() => {
    let result = applyFilters(matches, search, sportFilter, levelFilter)

    if (isLoggedIn && user?.neighborhood && sortByDistance) {
      result = [...result].sort((a, b) => {
        const distA = getDistanceKm(user.neighborhood, a.neighborhood)
        const distB = getDistanceKm(user.neighborhood, b.neighborhood)
        return distA - distB
      })
    }

    return result
  }, [matches, search, sportFilter, levelFilter, isLoggedIn, user, sortByDistance])

  const { nearbyMatches, otherMatches } = useMemo(() => {
    if (!user?.neighborhood || !sortByDistance) {
      return { nearbyMatches: filtered, otherMatches: [] as typeof filtered }
    }

    const nearby = filtered.filter(
      (m) => getDistanceKm(user.neighborhood, m.neighborhood) <= 8,
    )
    const others = filtered.filter(
      (m) => getDistanceKm(user.neighborhood, m.neighborhood) > 8,
    )

    return { nearbyMatches: nearby, otherMatches: others }
  }, [filtered, user, sortByDistance])

  const showSplitSections =
    isLoggedIn && user?.neighborhood && sortByDistance && otherMatches.length > 0

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark">
          {justRegistered && user?.neighborhood
            ? 'Partidas perto de você'
            : 'Partidas disponíveis'}
        </h1>
        <p className="mt-2 text-slate-600">
          {isLoggedIn && user?.neighborhood
            ? justRegistered
              ? `Cadastro feito! Estas são as partidas mais próximas de ${user.neighborhood}.`
              : `Partidas ordenadas por proximidade de ${formatUserLocation(user.neighborhood, user.city)}.`
            : 'Encontre jogos perto de você e participe agora.'}
        </p>
      </div>

      {justRegistered && user?.neighborhood && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-light border border-primary/20 text-primary-dark text-sm mb-6">
          <Navigation size={18} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Bem-vindo à PlayMatch!</p>
            <p className="mt-1">
              Mostrando primeiro as partidas mais próximas de {user.neighborhood}.
            </p>
          </div>
        </div>
      )}

      {isLoggedIn && user?.neighborhood && !justRegistered ? (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary-light border border-secondary/20 text-secondary-dark text-sm mb-6">
          <MapPin size={18} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Sua localização: {user.neighborhood}</p>
            <p className="mt-1 text-secondary-dark/80">
              {nearbyMatches.length > 0
                ? `${nearbyMatches.length} partida${nearbyMatches.length === 1 ? '' : 's'} a até 8 km de você.`
                : 'Nenhuma partida muito próxima no momento — veja todas abaixo.'}
            </p>
          </div>
        </div>
      ) : !isLoggedIn ? (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-primary-light border border-primary/20 text-sm mb-6">
          <p className="text-primary-dark">
            Faça cadastro e informe onde você mora para ver as partidas mais próximas.
          </p>
          <Button to="/cadastro" variant="primary" size="sm">
            Criar cadastro
          </Button>
        </div>
      ) : null}

      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 mb-8 space-y-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Buscar por esporte, bairro ou local..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
              <Filter size={14} />
              Esporte
            </label>
            <select
              value={sportFilter}
              onChange={(e) => setSportFilter(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm bg-white"
            >
              {sports.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1.5">
              <Filter size={14} />
              Nível
            </label>
            <select
              value={levelFilter}
              onChange={(e) =>
                setLevelFilter(e.target.value as (typeof levels)[number])
              }
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm bg-white"
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoggedIn && user?.neighborhood && (
          <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={sortByDistance}
              onChange={(e) => setSortByDistance(e.target.checked)}
              className="rounded border-slate-300 text-primary focus:ring-primary"
            />
            Ordenar pelas partidas mais próximas
          </label>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-slate-500 text-lg">Nenhuma partida encontrada.</p>
          <p className="text-sm text-slate-400 mt-2">
            Tente ajustar os filtros ou crie uma nova partida.
          </p>
        </div>
      ) : showSplitSections ? (
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-dark mb-1 flex items-center gap-2">
              <Navigation size={20} className="text-primary" />
              Mais próximas de você
            </h2>
            <p className="text-sm text-slate-500 mb-4">
              {nearbyMatches.length}{' '}
              {nearbyMatches.length === 1 ? 'partida' : 'partidas'} a até 8 km
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {nearbyMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  userNeighborhood={user?.neighborhood}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-dark mb-1">Outras partidas</h2>
            <p className="text-sm text-slate-500 mb-4">
              {otherMatches.length}{' '}
              {otherMatches.length === 1 ? 'partida' : 'partidas'} mais distantes
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  userNeighborhood={user?.neighborhood}
                />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <>
          {isLoggedIn && user?.neighborhood && sortByDistance && (
            <p className="text-sm text-slate-500 mb-4">
              {filtered.length}{' '}
              {filtered.length === 1
                ? 'partida encontrada'
                : 'partidas encontradas'}{' '}
              — da mais próxima à mais distante
            </p>
          )}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                userNeighborhood={user?.neighborhood}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
