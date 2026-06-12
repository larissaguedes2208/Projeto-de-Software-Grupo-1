import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Clock, Users, Check, Share2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { mockMatches, sportEmoji } from "@/lib/mock-data";

export const Route = createFileRoute("/match/$id")({
  head: () => ({ meta: [{ title: "Partida — PlayMatch" }, { name: "description", content: "Detalhes da partida e confirmação de presença." }] }),
  component: MatchDetail,
  notFoundComponent: () => <p className="p-6">Partida não encontrada.</p>,
});

function MatchDetail() {
  const { id } = useParams({ from: "/match/$id" });
  const match = mockMatches.find((m) => m.id === id);
  const [confirmed, setConfirmed] = useState(match?.confirmed ?? false);

  if (!match) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Partida não encontrada</p>
        <Link to="/feed" className="mt-4 inline-block font-semibold text-primary">Voltar ao feed</Link>
      </div>
    );
  }

  const players = [
    { n: match.organizer, a: match.organizerAvatar, host: true },
    { n: "Carlos M.", a: "CM" }, { n: "Ana P.", a: "AP" },
    { n: "Diego R.", a: "DR" }, { n: "Fernanda L.", a: "FL" },
    { n: "Bruno S.", a: "BS" }, { n: "Júlia T.", a: "JT" },
    { n: "Você", a: "JS", you: true },
  ].slice(0, match.participants);

  return (
    <div className="-mx-5 -mt-6">
      <div className="relative h-72 overflow-hidden">
        <img src={match.image} alt={match.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <Link to="/feed" className="absolute left-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur-md transition-colors hover:bg-background">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <button className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur-md transition-colors hover:bg-background">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6 px-5 pb-8">
        <div className="-mt-12 space-y-3">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-card px-3 py-1 text-xs font-bold shadow-[var(--shadow-soft)]">
              {sportEmoji[match.sport]} {match.sport}
            </span>
            <span className="rounded-full px-3 py-1 text-xs font-bold text-accent-foreground" style={{ background: "var(--gradient-accent)" }}>
              {match.level}
            </span>
            <span className="rounded-full bg-card px-3 py-1 text-xs font-bold shadow-[var(--shadow-soft)]">{match.price}</span>
          </div>
          <h1 className="font-display text-3xl font-bold leading-tight">{match.title}</h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Info icon={<MapPin />} label="Local" value={match.location} />
          <Info icon={<Clock />} label="Quando" value={`${match.date} · ${match.time}`} />
        </div>

        <div className="rounded-3xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold">
              <Users className="mr-1 inline h-4 w-4" /> {match.participants}/{match.maxParticipants} jogadores
            </h2>
            <span className="text-xs font-semibold text-success">{match.maxParticipants - match.participants} vagas</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {players.map((p) => (
              <div key={p.n} className="flex w-16 flex-col items-center text-center">
                <div className={`grid h-12 w-12 place-items-center rounded-full text-sm font-bold ${
                  p.host ? "text-primary-foreground" : p.you ? "bg-accent text-accent-foreground" : "bg-secondary"
                }`} style={p.host ? { background: "var(--gradient-hero)" } : undefined}>
                  {p.a}
                </div>
                <span className="mt-1 truncate text-[11px] font-medium">{p.n.split(" ")[0]}</span>
                {p.host && <span className="text-[10px] text-primary">Organiza</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5">
          <h2 className="mb-2 font-display text-lg font-bold">Sobre a partida</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Partida amistosa, ambiente descontraído. Traga sua garrafinha de água. Chegue 10 minutos antes para aquecer. Vamos formar times equilibrados na hora.
          </p>
        </div>

        <div className="sticky bottom-24 flex gap-3">
          <button className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-card transition-colors hover:bg-secondary">
            <MessageCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => setConfirmed((c) => !c)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 font-bold transition-all hover:scale-[1.01] active:scale-95 ${
              confirmed ? "bg-success text-success-foreground" : "text-primary-foreground"
            }`}
            style={!confirmed ? { background: "var(--gradient-accent)", boxShadow: "var(--shadow-accent)", color: "var(--accent-foreground)" } : undefined}
          >
            {confirmed ? <><Check className="h-5 w-5" /> Presença confirmada</> : "Confirmar presença"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <span className="text-primary [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span> {label}
      </div>
      <div className="mt-1 text-sm font-bold">{value}</div>
    </div>
  );
}
