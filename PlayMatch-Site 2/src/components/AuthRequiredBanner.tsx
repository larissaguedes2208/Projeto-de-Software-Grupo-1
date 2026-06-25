import { useLocation } from 'react-router-dom'
import { Lock } from 'lucide-react'
import Button from './Button'

export default function AuthRequiredBanner() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm mb-6">
      <Lock size={18} className="shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Cadastro necessário</p>
        <p className="mt-1 text-amber-800">
          Para criar ou participar de partidas, você precisa ter uma conta na
          PlayMatch.
        </p>
      </div>
    </div>
  )
}

interface LoginPromptProps {
  action: 'criar' | 'participar' | 'interagir'
}

const actionLabels = {
  criar: 'criar partidas',
  participar: 'participar de partidas',
  interagir: 'publicar e interagir na comunidade',
}

export function LoginPrompt({ action }: LoginPromptProps) {
  const location = useLocation()
  const verb = actionLabels[action]

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-sm">
      <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mx-auto mb-4">
        <Lock size={24} className="text-primary" />
      </div>
      <h2 className="text-xl font-bold text-dark">Faça seu cadastro</h2>
      <p className="mt-2 text-slate-600">
        Você precisa estar cadastrado para {verb} na PlayMatch.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          to="/cadastro"
          state={{ from: location.pathname, message: 'auth_required' }}
          variant="primary"
        >
          Criar cadastro
        </Button>
        <Button to="/partidas" variant="secondary">
          Ver partidas
        </Button>
      </div>
    </div>
  )
}
