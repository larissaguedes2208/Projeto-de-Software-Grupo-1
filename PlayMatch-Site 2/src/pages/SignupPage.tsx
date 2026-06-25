import { useState, useEffect, type FormEvent, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle, UserPlus } from 'lucide-react'
import Button from '../components/Button'
import AuthRequiredBanner from '../components/AuthRequiredBanner'
import { useAuth } from '../context/AuthContext'
import type { SignupForm } from '../types/user'
import { DEFAULT_CITY, NEIGHBORHOOD_NAMES } from '../data/rioNeighborhoods'

const sports = [
  'Futebol',
  'Vôlei',
  'Basquete',
  'Tênis',
  'Beach Tennis',
  'Futevôlei',
  'Corrida',
  'Outros',
]

const initialForm: SignupForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  city: DEFAULT_CITY,
  neighborhood: '',
  favoriteSport: '',
}

export default function SignupPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, isLoggedIn } = useAuth()
  const [form, setForm] = useState<SignupForm>(initialForm)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof SignupForm, string>>>({})

  const redirectTo =
    (location.state as { from?: string } | null)?.from ?? '/partidas'
  const showAuthBanner =
    (location.state as { message?: string } | null)?.message === 'auth_required'

  useEffect(() => {
    if (isLoggedIn && !success) {
      navigate(redirectTo, { replace: true })
    }
  }, [isLoggedIn, success, redirectTo, navigate])

  function validate(): boolean {
    const newErrors: Partial<Record<keyof SignupForm, string>> = {}

    if (!form.name.trim()) newErrors.name = 'Informe seu nome'
    if (!form.email.trim()) {
      newErrors.email = 'Informe seu e-mail'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'E-mail inválido'
    }
    if (!form.password) {
      newErrors.password = 'Informe uma senha'
    } else if (form.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres'
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }
    if (!form.city.trim()) newErrors.city = 'Informe sua cidade'
    if (!form.neighborhood) newErrors.neighborhood = 'Selecione onde você mora'
    if (!form.favoriteSport) newErrors.favoriteSport = 'Selecione um esporte'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    register(form)
    setSuccess(true)
  }

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      navigate('/partidas', {
        replace: true,
        state: {
          justRegistered: true,
          neighborhood: form.neighborhood,
        },
      })
    }, 2000)

    return () => clearTimeout(timer)
  }, [success, navigate, form.neighborhood])

  function updateField<K extends keyof SignupForm>(key: K, value: SignupForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }))
    }
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-dark">Cadastro realizado!</h1>
        <p className="mt-2 text-slate-600">
          Bem-vindo à PlayMatch, {form.name.split(' ')[0]}! Vamos mostrar partidas
          perto de {form.neighborhood}.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button to="/partidas" variant="primary">
            Ver partidas próximas
          </Button>
          <Button to="/perfil" variant="secondary">
            Ver meu perfil
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 bg-primary-light text-primary-dark px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <UserPlus size={16} />
          Junte-se à comunidade
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-dark">Criar cadastro</h1>
        <p className="mt-2 text-slate-600">
          Crie sua conta e informe onde você mora para ver partidas mais próximas.
        </p>
      </div>

      {showAuthBanner && <AuthRequiredBanner />}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm"
      >
        <Field label="Nome completo" error={errors.name} required>
          <input
            type="text"
            placeholder="Seu nome"
            value={form.name}
            onChange={(e) => updateField('name', e.target.value)}
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field label="E-mail" error={errors.email} required>
          <input
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(e) => updateField('email', e.target.value)}
            className={inputClass(!!errors.email)}
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Senha" error={errors.password} required>
            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              className={inputClass(!!errors.password)}
            />
          </Field>

          <Field label="Confirmar senha" error={errors.confirmPassword} required>
            <input
              type="password"
              placeholder="Repita a senha"
              value={form.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
              className={inputClass(!!errors.confirmPassword)}
            />
          </Field>
        </div>

        <Field label="Cidade" error={errors.city} required>
          <select
            value={form.city}
            onChange={(e) => updateField('city', e.target.value)}
            className={inputClass(!!errors.city)}
          >
            <option value={DEFAULT_CITY}>{DEFAULT_CITY}</option>
          </select>
        </Field>

        <Field label="Onde você mora?" error={errors.neighborhood} required>
          <select
            value={form.neighborhood}
            onChange={(e) => updateField('neighborhood', e.target.value)}
            className={inputClass(!!errors.neighborhood)}
          >
            <option value="">Selecione seu bairro</option>
            {NEIGHBORHOOD_NAMES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
          <p className="mt-1.5 text-xs text-slate-500">
            Usamos seu bairro para ordenar as partidas mais próximas de você.
          </p>
        </Field>

        <Field label="Esporte favorito" error={errors.favoriteSport} required>
          <select
            value={form.favoriteSport}
            onChange={(e) => updateField('favoriteSport', e.target.value)}
            className={inputClass(!!errors.favoriteSport)}
          >
            <option value="">Selecione um esporte</option>
            {sports.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Criar cadastro
        </Button>

        <p className="text-center text-sm text-slate-500">
          Só quer ver partidas?{' '}
          <Link to="/partidas" className="text-primary font-medium hover:underline">
            Explorar sem cadastro
          </Link>
        </p>
      </form>
    </div>
  )
}

function inputClass(hasError: boolean) {
  return [
    'w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors bg-white',
    hasError
      ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
      : 'border-slate-200 focus:ring-primary/30 focus:border-primary',
  ].join(' ')
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
