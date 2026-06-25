import {
  MapPin,
  Users,
  CalendarPlus,
  UsersRound,
  ArrowRight,
  Zap,
} from 'lucide-react'
import Button from '../components/Button'
import { LOGO_SRC } from '../components/Logo'

const benefits = [
  {
    icon: MapPin,
    title: 'Encontre jogadores próximos',
    description:
      'Descubra partidas na sua região e conecte-se com atletas amadores perto de você.',
  },
  {
    icon: Users,
    title: 'Participe de partidas',
    description:
      'Entre em jogos organizados por outros usuários com poucos cliques.',
  },
  {
    icon: CalendarPlus,
    title: 'Crie jogos com seus amigos',
    description:
      'Organize partidas personalizadas e convide quem quiser para jogar.',
  },
  {
    icon: UsersRound,
    title: 'Organize grupos esportivos',
    description:
      'Monte grupos fixos e mantenha sua galera sempre ativa nos esportes.',
  },
]

const sports = ['Futebol', 'Vôlei', 'Basquete', 'Tênis', 'Beach Tennis', 'Corrida']

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/25 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary-light px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-secondary/30">
                <Zap size={16} className="text-accent" />
                Sua comunidade esportiva
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                Encontre sua{' '}
                <span className="text-primary">próxima partida</span> agora
              </h1>

              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                A PlayMatch conecta pessoas que querem jogar esportes. Encontre
                partidas próximas, crie jogos com amigos e conheça novos
                jogadores — tudo em um só lugar.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Button to="/partidas" variant="primary" size="lg">
                  Encontrar partidas
                  <ArrowRight size={20} />
                </Button>
                <Button to="/criar-partida" variant="outline" size="lg">
                  Criar uma partida
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2 justify-center lg:justify-start">
                {sports.map((sport) => (
                  <span
                    key={sport}
                    className="px-4 py-2 rounded-full bg-white/10 text-sm font-medium text-slate-200 border border-white/10"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0">
              <img
                src={LOGO_SRC}
                alt="PlayMatch — conectando pessoas através do esporte"
                className="w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 object-contain drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Por que usar a PlayMatch?
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl mx-auto">
              Tudo o que você precisa para manter a rotina esportiva ativa e
              social.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map(({ icon: Icon, title, description }, i) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-secondary/30 hover:shadow-md transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${i % 2 === 0 ? 'bg-primary-light' : 'bg-secondary-light'}`}
                >
                  <Icon
                    size={22}
                    className={i % 2 === 0 ? 'text-primary' : 'text-secondary'}
                  />
                </div>
                <h3 className="font-bold text-dark mb-2">{title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-secondary-light/40 to-primary-light/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <img
            src={LOGO_SRC}
            alt=""
            aria-hidden
            className="w-20 h-20 mx-auto mb-4 object-contain"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-dark">
            Pronto para jogar?
          </h2>
          <p className="mt-3 text-slate-600 max-w-md mx-auto">
            Junte-se à comunidade PlayMatch e nunca mais fique sem parceiros
            para o esporte.
          </p>
          <div className="mt-6">
            <Button to="/partidas" variant="primary" size="lg">
              Ver partidas disponíveis
              <ArrowRight size={20} />
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
