import { useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Button from '../components/Button'
import { useAuth } from '../context/AuthContext'
import { useMatches } from '../context/MatchesContext'
import type { CreateMatchForm, SkillLevel } from '../types/match'
import { NEIGHBORHOOD_NAMES } from '../data/rioNeighborhoods'

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

const levels: SkillLevel[] = [
  'Iniciante',
  'Intermediário',
  'Avançado',
  'Todos os níveis',
]

const initialForm: CreateMatchForm = {
  sport: '',
  venue: '',
  neighborhood: '',
  date: '',
  time: '',
  spots: 10,
  level: 'Todos os níveis',
  description: '',
}

export default function CreateMatchPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { createMatch } = useMatches()
  const [form, setForm] = useState<CreateMatchForm>({
    ...initialForm,
    neighborhood: user?.neighborhood ?? '',
  })
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof CreateMatchForm, string>>>({})

  function validate(): boolean {
    const newErrors: Partial<Record<keyof CreateMatchForm, string>> = {}

    if (!form.sport) newErrors.sport = 'Selecione um esporte'
    if (!form.venue.trim()) newErrors.venue = 'Informe o nome do local'
    if (!form.neighborhood) newErrors.neighborhood = 'Selecione o bairro'
    if (!form.date) newErrors.date = 'Informe a data'
    if (!form.time) newErrors.time = 'Informe o horário'
    if (form.spots < 2) newErrors.spots = 'Mínimo de 2 vagas'
    if (!form.description.trim()) newErrors.description = 'Adicione uma descrição'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const match = createMatch(form, user!.name)
    setSuccess(true)

    setTimeout(() => {
      navigate(`/partidas/${match.id}`)
    }, 1500)
  }

  function updateField<K extends keyof CreateMatchForm>(
    key: K,
    value: CreateMatchForm[K],
  ) {
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
        <h1 className="text-2xl font-bold text-dark">Partida criada!</h1>
        <p className="mt-2 text-slate-600">Redirecionando para os detalhes...</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-dark">
          Criar partida
        </h1>
        <p className="mt-2 text-slate-600">
          Preencha os dados e convide jogadores para o seu jogo.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm"
      >
        <Field label="Esporte" error={errors.sport} required>
          <select
            value={form.sport}
            onChange={(e) => updateField('sport', e.target.value)}
            className={inputClass(!!errors.sport)}
          >
            <option value="">Selecione o esporte</option>
            {sports.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Nome do local" error={errors.venue} required>
          <input
            type="text"
            placeholder="Ex: Arena Copacabana"
            value={form.venue}
            onChange={(e) => updateField('venue', e.target.value)}
            className={inputClass(!!errors.venue)}
          />
        </Field>

        <Field label="Bairro" error={errors.neighborhood} required>
          <select
            value={form.neighborhood}
            onChange={(e) => updateField('neighborhood', e.target.value)}
            className={inputClass(!!errors.neighborhood)}
          >
            <option value="">Selecione o bairro</option>
            {NEIGHBORHOOD_NAMES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Data" error={errors.date} required>
            <input
              type="date"
              value={form.date}
              onChange={(e) => updateField('date', e.target.value)}
              className={inputClass(!!errors.date)}
            />
          </Field>

          <Field label="Horário" error={errors.time} required>
            <input
              type="time"
              value={form.time}
              onChange={(e) => updateField('time', e.target.value)}
              className={inputClass(!!errors.time)}
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Número de vagas" error={errors.spots} required>
            <input
              type="number"
              min={2}
              max={50}
              value={form.spots}
              onChange={(e) => updateField('spots', Number(e.target.value))}
              className={inputClass(!!errors.spots)}
            />
          </Field>

          <Field label="Nível" required>
            <select
              value={form.level}
              onChange={(e) => updateField('level', e.target.value as SkillLevel)}
              className={inputClass(false)}
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Descrição" error={errors.description} required>
          <textarea
            rows={4}
            placeholder="Descreva a partida, regras, o que levar..."
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            className={inputClass(!!errors.description) + ' resize-none'}
          />
        </Field>

        <Button type="submit" variant="primary" size="lg" fullWidth>
          Criar partida
        </Button>
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
