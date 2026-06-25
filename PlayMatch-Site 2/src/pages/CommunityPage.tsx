import { useMemo, useState, type FormEvent } from 'react'
import { MessageSquarePlus, Users } from 'lucide-react'
import PostCard from '../components/PostCard'
import Button from '../components/Button'
import { LoginPrompt } from '../components/AuthRequiredBanner'
import { useAuth } from '../context/AuthContext'
import { useCommunity } from '../context/CommunityContext'
import { formatUserLocation } from '../utils/location'

const sports = [
  'Todos',
  'Geral',
  'Futebol',
  'Vôlei',
  'Basquete',
  'Tênis',
  'Beach Tennis',
  'Futevôlei',
  'Corrida',
  'Outros',
]

const postSports = sports.filter((s) => s !== 'Todos')

export default function CommunityPage() {
  const { isLoggedIn, user } = useAuth()
  const { posts, addPost } = useCommunity()
  const [filter, setFilter] = useState('Todos')
  const [sport, setSport] = useState('Geral')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')

  const filtered = useMemo(() => {
    if (filter === 'Todos') return posts
    return posts.filter((p) => p.sport === filter)
  }, [posts, filter])

  function handlePost(e: FormEvent) {
    e.preventDefault()
    if (!user) return
    if (!content.trim()) {
      setError('Escreva uma mensagem para publicar.')
      return
    }
    if (content.trim().length < 10) {
      setError('A mensagem deve ter pelo menos 10 caracteres.')
      return
    }

    addPost(
      { sport, content },
      user.name,
      user.neighborhood
        ? formatUserLocation(user.neighborhood, user.city)
        : user.city,
    )
    setContent('')
    setError('')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-secondary-light text-secondary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Users size={16} />
          Comunidade esportiva
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-dark">Comunidade</h1>
        <p className="mt-2 text-slate-600">
          Converse com outros jogadores, combine partidas e compartilhe dicas.
        </p>
      </div>

      {isLoggedIn && user ? (
        <form
          onSubmit={handlePost}
          className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
              <MessageSquarePlus size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-dark text-sm">
                O que você quer compartilhar, {user.name.split(' ')[0]}?
              </p>
              <p className="text-xs text-slate-500">
                {user.neighborhood
                  ? formatUserLocation(user.neighborhood, user.city)
                  : user.city}
              </p>
            </div>
          </div>

          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white mb-3"
          >
            {postSports.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <textarea
            rows={3}
            placeholder="Ex: Alguém anima jogar vôlei amanhã no Botafogo?"
            value={content}
            onChange={(e) => {
              setContent(e.target.value)
              if (error) setError('')
            }}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary resize-none"
          />

          {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

          <div className="mt-4 flex justify-end">
            <Button type="submit" variant="primary" size="sm">
              Publicar
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-8">
          <LoginPrompt action="interagir" />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {sports.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={[
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              filter === s
                ? 'bg-secondary text-white shadow-md shadow-secondary/25'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-secondary hover:text-secondary',
            ].join(' ')}
          >
            {s}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500 mb-4">
        {filtered.length}{' '}
        {filtered.length === 1 ? 'publicação' : 'publicações'}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500">Nenhuma publicação neste tópico ainda.</p>
          {isLoggedIn && (
            <p className="text-sm text-slate-400 mt-2">
              Seja o primeiro a publicar algo!
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
