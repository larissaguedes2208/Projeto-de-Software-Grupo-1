import { createFileRoute } from "@tanstack/react-router";
import { mockMatches } from "@/lib/mock-data";
import { MatchCard } from "@/components/MatchCard";
import { useState } from "react";

export const Route = createFileRoute("/matches")({
  head: () => ({ meta: [{ title: "Minhas partidas — PlayMatch" }, { name: "description", content: "Suas partidas confirmadas e organizadas." }] }),
  component: MyMatches,
});

function MyMatches() {
  const [tab, setTab] = useState<"confirmed" | "organized">("confirmed");
  const confirmed = mockMatches.filter((m) => m.confirmed);
  const organized = mockMatches.filter((m) => m.organizer === "João Silva");
  const list = tab === "confirmed" ? confirmed : organized;

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Minhas partidas</h1>

      <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-card p-1">
        {[
          { k: "confirmed", l: `Confirmadas (${confirmed.length})` },
          { k: "organized", l: `Organizadas (${organized.length})` },
        ].map((t) => {
          const active = tab === (t.k as typeof tab);
          return (
            <button
              key={t.k}
              onClick={() => setTab(t.k as typeof tab)}
              className={`rounded-xl py-2.5 text-sm font-semibold transition-all ${active ? "text-primary-foreground" : "text-muted-foreground"}`}
              style={active ? { background: "var(--gradient-hero)" } : undefined}
            >
              {t.l}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {list.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Você ainda não tem partidas {tab === "confirmed" ? "confirmadas" : "organizadas"}.
          </p>
        ) : (
          list.map((m) => <MatchCard key={m.id} match={m} />)
        )}
      </div>
    </div>
  );
}
