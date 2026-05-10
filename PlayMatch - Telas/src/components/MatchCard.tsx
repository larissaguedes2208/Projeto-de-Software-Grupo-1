import { Link } from "@tanstack/react-router";
import { MapPin, Clock, Users, Check } from "lucide-react";
import { sportEmoji, type Match } from "@/lib/mock-data";

export function MatchCard({ match }: { match: Match }) {
  const pct = (match.participants / match.maxParticipants) * 100;
  return (
    <Link
      to="/match/$id"
      params={{ id: match.id }}
      className="group block overflow-hidden rounded-3xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={match.image} alt={match.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
            {sportEmoji[match.sport]} {match.sport}
          </span>
          <span className="rounded-full bg-accent/95 px-3 py-1 text-xs font-semibold text-accent-foreground">
            {match.level}
          </span>
        </div>
        {match.confirmed && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-success px-3 py-1 text-xs font-semibold text-success-foreground">
            <Check className="h-3 w-3" /> Confirmado
          </span>
        )}
        <div className="absolute inset-x-4 bottom-3 text-primary-foreground">
          <h3 className="font-display text-lg font-bold leading-tight">{match.title}</h3>
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{match.location}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary" />
            <span>{match.date} · {match.time}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              {match.organizerAvatar}
            </span>
            <span className="text-xs text-muted-foreground">por <span className="font-semibold text-foreground">{match.organizer}</span></span>
          </div>
          <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold">{match.price}</span>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 font-medium"><Users className="h-3.5 w-3.5" /> {match.participants}/{match.maxParticipants} jogadores</span>
            <span className="text-muted-foreground">{match.maxParticipants - match.participants} vagas</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "var(--gradient-accent)" }} />
          </div>
        </div>
      </div>
    </Link>
  );
}
