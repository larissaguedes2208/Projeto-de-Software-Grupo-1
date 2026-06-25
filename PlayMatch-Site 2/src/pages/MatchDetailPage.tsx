import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Calendar,
  User,
  Users,
  Trophy,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react'
import { formatDate } from '../components/MatchCard'
import Button from '../components/Button'
import { LoginPrompt } from '../components/AuthRequiredBanner'
import { useAuth } from '../context/AuthContext'
import { useMatches } from '../context/MatchesContext'

export default function MatchDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isLoggedIn, user } = useAuth()
  const { getMatchById, joinMatch } = useMatches()
  const [joined, setJoined] = useState(false)
  const [error, setError] = useState('')

  const match = id ? getMatchById(id) : undefined

  if (!match) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-dark">Partida não encontrada</h1>
        <p className="mt-2 text-slate-600">
          Esta partida pode ter sido removida ou o link está incorreto.
        </p>
        <div className="mt-6">
          <Button to="/partidas" variant="primary">
            Ver todas as partidas
          </Button>
        </div>
      </div>
    )
  }

  const filled = match.maxSpots - match.spots
  const isFull = match.spots <= 0
  const alreadyJoined = user ? match.participants.includes(user.name) : false
  const isJoined = joined || alreadyJoined

  function handleJoin() {
    if (!isLoggedIn || !user) {
      navigate('/cadastro', {
        state: { from: `/partidas/${id}`, message: 'auth_required' },
      })
      return
    }

    if (!id) return
    const success = joinMatch(id, user.name)
    if (success) {
      setJoined(true)
      setError('')
    } else {
      setError('Não foi possível participar. A partida pode estar lotada.')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <Link
        to="/partidas"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-primary mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Voltar para partidas
      </Link>

      <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-dark px-6 py-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/30 via-transparent to-transparent" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <Trophy size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{match.sport}</h1>
                <span className="inline-block mt-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                  {match.level}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <DetailItem icon={MapPin} label="Localização" value={match.location} />
            <DetailItem
              icon={Calendar}
              label="Data e horário"
              value={`${formatDate(match.date)} às ${match.time}`}
            />
            <DetailItem icon={User} label="Organizador" value={match.organizer} />
            <DetailItem
              icon={Users}
              label="Jogadores"
              value={`${filled} de ${match.maxSpots} confirmados · ${match.spots} ${match.spots === 1 ? 'vaga' : 'vagas'}`}
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Descrição
            </h2>
            <p className="text-slate-700 leading-relaxed">{match.description}</p>
          </div>

          {match.participants.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Participantes ({match.participants.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {match.participants.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-sm text-slate-700"
                  >
                    <User size={14} className="text-primary" />
                    {name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {isJoined && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-primary-light text-primary-dark text-sm font-medium">
              <CheckCircle size={18} />
              Você está inscrito nesta partida!
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm">{error}</div>
          )}

          {!isLoggedIn ? (
            <LoginPrompt action="participar" />
          ) : (
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleJoin}
              disabled={isFull || isJoined}
            >
              {isJoined
                ? 'Inscrito!'
                : isFull
                  ? 'Partida lotada'
                  : 'Participar da partida'}
            </Button>
          )}
        </div>
      </article>
    </div>
  )
}

function DetailItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50">
      <Icon size={18} className="text-primary shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="text-sm font-medium text-dark mt-0.5">{value}</p>
      </div>
    </div>
  )
}
