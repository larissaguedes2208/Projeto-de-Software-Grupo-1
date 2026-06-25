import { Link, NavLink } from 'react-router-dom'
import { LogOut, Menu, User, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/partidas', label: 'Partidas' },
  { to: '/comunidade', label: 'Comunidade' },
  { to: '/criar-partida', label: 'Criar partida' },
  { to: '/perfil', label: 'Perfil', hideWhenLoggedOut: true },
  { to: '/cadastro', label: 'Cadastro', hideWhenLoggedIn: true },
  { to: '/sobre', label: 'Sobre' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isLoggedIn, user, logout } = useAuth()

  const visibleLinks = navLinks.filter((link) => {
    if (link.hideWhenLoggedIn && isLoggedIn) return false
    if (link.hideWhenLoggedOut && !isLoggedIn) return false
    return true
  })

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-secondary-light shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Logo size="md" />

          <nav className="hidden md:flex items-center gap-1">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-light text-primary-dark'
                      : 'text-slate-600 hover:text-secondary hover:bg-secondary-light/60',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}

            {isLoggedIn && user && (
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
                <Link
                  to="/perfil"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary-light text-secondary-dark text-sm font-medium hover:bg-secondary-light/80 transition-colors"
                >
                  <User size={14} />
                  {user.name.split(' ')[0]}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  aria-label="Sair"
                  title="Sair"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </nav>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-secondary-light/60"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-1">
            {isLoggedIn && user && (
              <div className="flex items-center justify-between px-4 py-3 mb-2 rounded-lg bg-secondary-light">
                <Link
                  to="/perfil"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 text-sm font-medium text-secondary-dark"
                >
                  <User size={16} />
                  Olá, {user.name.split(' ')[0]}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setMenuOpen(false)
                  }}
                  className="text-sm text-slate-600 hover:text-red-600"
                >
                  Sair
                </button>
              </div>
            )}

            {visibleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  [
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-light text-primary-dark'
                      : 'text-slate-600 hover:text-secondary hover:bg-secondary-light/60',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
