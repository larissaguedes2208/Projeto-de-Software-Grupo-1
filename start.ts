import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { mockMatches, sportEmoji, type Sport } from "@/lib/mock-data";
import { MatchCard } from "@/components/MatchCard";

export const Route = createFileRoute("/feed")({
  head: () => ({ meta: [{ title: "Feed de partidas — PlayMatch" }, { name: "description", content: "Descubra partidas esportivas perto de você." }] }),
  component: Feed,
});

const filters: ("Todos" | Sport)[] = ["Todos", "Futebol", "Basquete", "Vôlei", "Tênis", "Beach Tennis", "Futsal"];

function Feed() {
  const [filter, setFilter] = useState<"Todos" | Sport>("Todos");
  const [q, setQ] = useState("");
  const list = mockMatches.filter(
    (m) => (filter === "Todos" || m.sport === filter) && m.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Bom dia, João 👋</h1>
        <p className="text-sm text-muted-foreground">Encontre sua próxima partida</p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar partidas, locais..."
            className="w-full rounded-2xl border border-border bg-card py-3.5 pl-11 pr-4 text-sm outline-none transition-all focus:border-primary"
          />
        </div>
        <button className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-card transition-colors hover:bg-secondary">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                active ? "border-transparent text-primary-foreground" : "border-border bg-card text-foreground hover:border-primary/30"
              }`}
              style={active ? { background: "var(--gradient-hero)" } : undefined}
            >
              {f === "Todos" ? "✨" : sportEmoji[f]} {f}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {list.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            Nenhuma partida encontrada. Que tal criar uma?
          </p>
        ) : (
          list.map((m) => <MatchCard key={m.id} match={m} />)
        )}
      </div>
    </div>
  );
}
