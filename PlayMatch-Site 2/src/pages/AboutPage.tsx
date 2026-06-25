import {
  Target,
  Heart,
  Zap,
  Shield,
  Users,
  Trophy,
} from 'lucide-react'
import Button from '../components/Button'

const values = [
  {
    icon: Target,
    title: 'Nosso objetivo',
    description:
      'Conectar pessoas através do esporte, facilitando a organização de partidas e incentivando um estilo de vida mais ativo e saudável.',
  },
  {
    icon: Heart,
    title: 'Comunidade',
    description:
      'Somos uma rede social voltada para esportes, onde atletas amadores encontram parceiros, amigos e novas experiências.',
  },
  {
    icon: Zap,
    title: 'Praticidade',
    description:
      'Chega de depender só de grupos de mensagens. Com a PlayMatch, organizar e encontrar jogos ficou rápido e simples.',
  },
  {
    icon: Shield,
    title: 'Para todos',
    description:
      'Iniciantes ou avançados, futebol ou corrida — a plataforma acolhe todos que querem praticar esporte de forma recreativa.',
  },
]

const sports = [
  'Futebol',
  'Vôlei',
  'Basquete',
  'Tênis',
  'Beach Tennis',
  'Futevôlei',
  'Corrida',
  'Outros esportes',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-dark text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <Trophy size={28} className="text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">
            Sobre a PlayMatch
          </h1>
          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A PlayMatch é uma plataforma digital criada para conectar pessoas
            por meio do esporte. Nosso objetivo é facilitar que qualquer pessoa
            encontre partidas esportivas, organize jogos e conheça novos
            jogadores de forma rápida e prática.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-dark">
                Esporte que aproxima pessoas
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                A plataforma funciona como uma rede social voltada para
                esportes. Os usuários podem visualizar partidas disponíveis na
                sua região, criar seus próprios eventos esportivos, participar
                de jogos organizados por outras pessoas e interagir com outros
                atletas amadores.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                A PlayMatch busca incentivar a prática esportiva, promover a
                integração entre pessoas com interesses em comum e tornar mais
                fácil organizar partidas sem depender apenas de grupos de
                mensagens.
              </p>
            </div>

            <div className="bg-primary-light/50 rounded-2xl p-8 border border-primary/20">
              <div className="flex items-center gap-3 mb-4">
                <Users size={24} className="text-primary" />
                <h3 className="font-bold text-dark text-lg">Público-alvo</h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Pessoas que praticam esportes de forma amadora ou recreativa e
                desejam encontrar parceiros para jogar:
              </p>
              <div className="flex flex-wrap gap-2">
                {sports.map((sport) => (
                  <span
                    key={sport}
                    className="px-3 py-1.5 rounded-full bg-white text-sm font-medium text-dark border border-slate-200"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-slate-100/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-dark text-center mb-10">
            Nossos diferenciais
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-slate-200"
              >
                <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center mb-4">
                  <Icon size={20} className="text-primary" />
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

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-2xl font-bold text-dark italic">
            "Conectando pessoas através do esporte."
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button to="/partidas" variant="primary" size="lg">
              Encontrar partidas
            </Button>
            <Button to="/criar-partida" variant="secondary" size="lg">
              Criar uma partida
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
