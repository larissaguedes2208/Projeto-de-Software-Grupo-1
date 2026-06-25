import { useState, type FormEvent } from 'react'
import {
  Heart,
  MapPin,
  MessageCircle,
  Send,
  Trophy,
  User,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useCommunity } from '../context/CommunityContext'
import type { CommunityPost } from '../types/community'

function formatTime(dateStr: string) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMin / 60)
  const diffD = Math.floor(diffH / 24)

  if (diffMin < 1) return 'Agora'
  if (diffMin < 60) return `${diffMin} min atrás`
  if (diffH < 24) return `${diffH}h atrás`
  if (diffD < 7) return `${diffD}d atrás`

  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

interface PostCardProps {
  post: CommunityPost
}

export default function PostCard({ post }: PostCardProps) {
  const { isLoggedIn, user } = useAuth()
  const { toggleLike, addComment } = useCommunity()
  const [showComments, setShowComments] = useState(false)
  const [comment, setComment] = useState('')

  const liked = user ? post.likes.includes(user.name) : false

  function handleComment(e: FormEvent) {
    e.preventDefault()
    if (!user || !comment.trim()) return
    addComment(post.id, user.name, comment)
    setComment('')
    setShowComments(true)
  }

  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-full bg-secondary-light flex items-center justify-center shrink-0">
          <User size={20} className="text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-dark">{post.author}</span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <MapPin size={12} />
              {post.authorCity}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary-light text-primary-dark">
              <Trophy size={12} />
              {post.sport}
            </span>
            <span className="text-xs text-slate-400">{formatTime(post.createdAt)}</span>
          </div>
        </div>
      </div>

      <p className="mt-4 text-slate-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </p>

      <div className="mt-4 flex items-center gap-4 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => isLoggedIn && user && toggleLike(post.id, user.name)}
          disabled={!isLoggedIn}
          className={[
            'inline-flex items-center gap-1.5 text-sm font-medium transition-colors',
            liked
              ? 'text-red-500'
              : 'text-slate-500 hover:text-red-500',
            !isLoggedIn ? 'opacity-50 cursor-not-allowed' : '',
          ].join(' ')}
        >
          <Heart size={18} className={liked ? 'fill-current' : ''} />
          {post.likes.length > 0 && post.likes.length}
          <span className="sr-only">Curtir</span>
        </button>

        <button
          type="button"
          onClick={() => setShowComments(!showComments)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-secondary transition-colors"
        >
          <MessageCircle size={18} />
          {post.comments.length > 0 && post.comments.length}
          <span>{post.comments.length === 1 ? 'Comentário' : 'Comentários'}</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-3">
          {post.comments.map((c) => (
            <div key={c.id} className="flex gap-2 pl-2 border-l-2 border-secondary-light">
              <div className="flex-1 min-w-0">
                <p className="text-sm">
                  <span className="font-semibold text-dark">{c.author}</span>{' '}
                  <span className="text-slate-600">{c.content}</span>
                </p>
                <p className="text-xs text-slate-400 mt-0.5">{formatTime(c.createdAt)}</p>
              </div>
            </div>
          ))}

          {isLoggedIn && user ? (
            <form onSubmit={handleComment} className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="Escreva um comentário..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="p-2.5 rounded-xl bg-secondary text-white hover:bg-secondary-dark disabled:opacity-50 transition-colors"
                aria-label="Enviar comentário"
              >
                <Send size={18} />
              </button>
            </form>
          ) : (
            <p className="text-xs text-slate-500">
              Faça cadastro para comentar e curtir publicações.
            </p>
          )}
        </div>
      )}
    </article>
  )
}
