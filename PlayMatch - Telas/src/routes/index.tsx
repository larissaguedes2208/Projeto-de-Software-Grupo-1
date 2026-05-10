import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Zap, Users, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PlayMatch — encontre sua próxima partida" },
      { name: "description", content: "Plataforma para organizar partidas esportivas. Crie, encontre e confirme presença em jogos perto de você." },
      { property: "og:title", content: "PlayMatch — esporte com a galera" },
      { property: "og:description", content: "Encontre partidas perto de você em segundos." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-mesh)" }}>
      <div className="mx-auto max-w-2xl px-5 pt-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
              <Trophy className="h-5 w-5" />
            </div>
            <span className="font-display text-xl font-bold">PlayMatch</span>
          </div>
          <Link to="/login" className="text-sm font-semibold text-primary">Entrar</Link>
        </header>

        <section className="pt-12 pb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <Zap className="h-3.5 w-3.5 text-accent" /> +12.000 atletas ativos
          </span>
          <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight">
            Joga aí?
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
              A galera está te esperando.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-base text-muted-foreground">
            Encontre, organize e confirme presença em partidas perto de você. Futebol, basquete, vôlei e muito mais.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold text-primary-foreground transition-all hover:scale-[1.02] active:scale-95"
              style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elevated)" }}
            >
              Começar agora <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/feed"
              className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold transition-colors hover:bg-secondary"
            >
              Explorar partidas
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-3 gap-3 pb-16">
          {[
            { icon: MapPin, label: "Perto de você", v: "1.2k" },
            { icon: Users, label: "Confirmados hoje", v: "340" },
            { icon: Trophy, label: "Esportes", v: "12+" },
          ].map(({ icon: Icon, label, v }) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-4 text-center">
              <Icon className="mx-auto h-5 w-5 text-accent" />
              <div className="mt-2 font-display text-2xl font-bold">{v}</div>
              <div className="text-[11px] text-muted-foreground">{label}</div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
