import { createFileRoute, Link } from "@tanstack/react-router";
import { Settings, Trophy, Calendar, Star, LogOut, MapPin } from "lucide-react";
import { sportEmoji } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Perfil — PlayMatch" }, { name: "description", content: "Seu perfil de atleta no PlayMatch." }] }),
  component: Profile,
});

const stats = [
  { icon: Calendar, label: "Partidas", value: "47" },
  { icon: Trophy, label: "Organizou", value: "12" },
  { icon: Star, label: "Avaliação", value: "4.9" },
];

const sports: ("Futebol" | "Basquete" | "Beach Tennis")[] = ["Futebol", "Basquete", "Beach Tennis"];

function Profile() {
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-border p-6 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30" style={{ background: "var(--gradient-accent)" }} />
        <button className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-background/20 backdrop-blur transition-colors hover:bg-background/30">
          <Settings className="h-4 w-4" />
        </button>
        <div className="relative flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-background/95 text-2xl font-bold text-primary">JS</div>
          <div>
            <h1 className="font-display text-2xl font-bold">João Silva</h1>
            <p className="flex items-center gap-1 text-sm opacity-90"><MapPin className="h-3.5 w-3.5" /> São Paulo, SP</p>
            <span className="mt-2 inline-flex rounded-full bg-background/20 px-2.5 py-0.5 text-xs font-semibold backdrop-blur">⭐ Atleta nível Ouro</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4 text-center">
            <Icon className="mx-auto h-5 w-5 text-accent" />
            <div className="mt-1.5 font-display text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-5">
        <h2 className="mb-3 font-display text-lg font-bold">Esportes favoritos</h2>
        <div className="flex flex-wrap gap-2">
          {sports.map((s) => (
            <span key={s} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold">
              {sportEmoji[s]} {s}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-5">
        <h2 className="mb-3 font-display text-lg font-bold">Conquistas</h2>
        <div className="grid grid-cols-4 gap-3">
          {["🏆", "⚽", "🔥", "🎯"].map((b, i) => (
            <div key={i} className="grid aspect-square place-items-center rounded-2xl bg-secondary text-3xl">{b}</div>
          ))}
        </div>
      </div>

      <Link to="/" className="flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card py-3.5 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/5">
        <LogOut className="h-4 w-4" /> Sair da conta
      </Link>
    </div>
  );
}
