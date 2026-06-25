import { Link } from 'react-router-dom'
import {
  Calendar,
  LogOut,
  Mail,
  MapPin,
  Trophy,
  User,
  Users,
} from 'lucide-react'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useMatches } from '../context/MatchesContext'
import { formatUserLocation } from '../utils/location'

function formatMemberSince(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { matches } = useMatches()

  if (!user) return null

  const createdMatches = matches.filter((m) => m.organizer === user.name)
  const joinedMatches = matches.filter(
    (m) => m.participants.includes(user.name) && m.organizer !== user.name,
  )

  const infoItems = [
    { icon: User, label: 'Nome', value: user.name },
    { icon: Mail, label: 'E-mail', value: user.email },
    {
      icon: MapPin,
      label: 'Onde moro',
      value: user.neighborhood
        ? formatUserLocation(user.neighborhood, user.city)
        : user.city,
    },
    { icon: Trophy, label: 'Esporte favorito', value: user.favoriteSport },
    {
      icon: Calendar,
      label: 'Membro desde',
      value: formatMemberSince(user.createdAt),
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-secondary-light text-secondary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <User size={16} />
          Meu perfil
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-dark">Olá, {user.name.split(' ')[0]}!</h1>
        <p className="mt-2 text-slate-600">
          Veja seus dados e acompanhe sua atividade na PlayMatch.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="bg-dark px-6 py-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent" />
          <div className="relative flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border-2 border-white/20">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-slate-300 text-sm mt-1">{user.email}</p>
              {user.neighborhood && (
                <p className="inline-flex items-center gap-1.5 text-sm text-primary-light mt-2">
                  <MapPin size={14} />
                  {formatUserLocation(user.neighborhood, user.city)}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 grid sm:grid-cols-2 gap-4">
          {infoItems.map(({ icon: Icon, label, value }) => (
            <div key={label} className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wide mb-1.5">
                <Icon size={14} className="text-secondary" />
                {label}
              </div>
              <p className="text-sm font-semibold text-dark">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
          <p className="text-3xl font-bold text-primary">{createdMatches.length}</p>
          <p className="text-sm text-slate-600 mt-1">Partidas criadas</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 text-center">
          <p className="text-3xl font-bold text-secondary">{joinedMatches.length}</p>
          <p className="text-sm text-slate-600 mt-1">Partidas que participo</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="font-bold text-dark mb-4 flex items-center gap-2">
          <Users size={18} className="text-primary" />
          Ações rápidas
        </h3>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <Button to="/partidas" variant="primary" size="sm">
            Ver partidas próximas
          </Button>
          <Button to="/criar-partida" variant="secondary" size="sm">
            Criar partida
          </Button>
          <Button to="/comunidade" variant="secondary" size="sm">
            Comunidade
          </Button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-red-600 border-2 border-red-100 hover:bg-red-50 transition-colors"
          >
            <LogOut size={16} />
            Sair da conta
          </button>
        </div>
      </div>

      {!user.neighborhood && (
        <p className="mt-6 text-center text-sm text-slate-500">
          Quer atualizar seu bairro?{' '}
          <Link to="/cadastro" className="text-primary font-medium hover:underline">
            Faça um novo cadastro
          </Link>
        </p>
      )}
    </div>
  )
}
