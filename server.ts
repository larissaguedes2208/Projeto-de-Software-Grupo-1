import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Calendar, Clock, Users, DollarSign, Trophy } from "lucide-react";
import { sportEmoji, type Sport } from "@/lib/mock-data";

export const Route = createFileRoute("/create")({
  head: () => ({ meta: [{ title: "Criar partida — PlayMatch" }, { name: "description", content: "Organize uma nova partida e convide a galera." }] }),
  component: CreateMatch,
});

const sports: Sport[] = ["Futebol", "Basquete", "Vôlei", "Tênis", "Beach Tennis", "Futsal"];
const levels = ["Todos", "Iniciante", "Intermediário", "Avançado"];

function CreateMatch() {
  const nav = useNavigate();
  const [sport, setSport] = useState<Sport>("Futebol");
  const [level, setLevel] = useState("Todos");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Criar partida</h1>
        <p className="text-sm text-muted-foreground">Organize um jogo e chame a galera</p>
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); nav({ to: "/feed" }); }}
        className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
      >
        <Field icon={<Trophy className="h-4 w-4" />} label="Título da partida">
          <input required placeholder="Ex: Pelada de quinta" className="input-field" />
        </Field>

        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Esporte</span>
          <div className="grid grid-cols-3 gap-2">
            {sports.map((s) => {
              const on = sport === s;
              return (
                <button
                  type="button"
                  key={s}
                  onClick={() => setSport(s)}
                  className={`rounded-2xl border p-3 text-center text-xs font-semibold transition-all ${
                    on ? "border-transparent text-primary-foreground" : "border-border bg-secondary"
                  }`}
                  style={on ? { background: "var(--gradient-hero)" } : undefined}
                >
                  <div className="text-xl">{sportEmoji[s]}</div>
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        <Field icon={<MapPin className="h-4 w-4" />} label="Local">
          <input required placeholder="Endereço ou nome do local" className="input-field" />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field icon={<Calendar className="h-4 w-4" />} label="Data">
            <input type="date" required className="input-field" />
          </Field>
          <Field icon={<Clock className="h-4 w-4" />} label="Horário">
            <input type="time" required className="input-field" />
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field icon={<Users className="h-4 w-4" />} label="Vagas">
            <input type="number" min={2} defaultValue={10} required className="input-field" />
          </Field>
          <Field icon={<DollarSign className="h-4 w-4" />} label="Valor (R$)">
            <input type="text" placeholder="0 = grátis" className="input-field" />
          </Field>
        </div>

        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nível</span>
          <div className="flex flex-wrap gap-2">
            {levels.map((l) => {
              const on = level === l;
              return (
                <button
                  type="button"
                  key={l}
                  onClick={() => setLevel(l)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                    on ? "border-transparent text-accent-foreground" : "border-border bg-secondary"
                  }`}
                  style={on ? { background: "var(--gradient-accent)" } : undefined}
                >
                  {l}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-2xl py-3.5 font-bold text-primary-foreground transition-all hover:scale-[1.01] active:scale-95"
          style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elevated)" }}
        >
          Publicar partida
        </button>
      </form>

      <style>{`.input-field{width:100%;border-radius:14px;border:1px solid var(--border);background:var(--background);padding:12px 14px;font-size:15px;outline:none;transition:all .2s}.input-field:focus{border-color:var(--primary);box-shadow:0 0 0 3px color-mix(in oklab, var(--primary) 18%, transparent)}`}</style>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{icon} {label}</span>
      {children}
    </label>
  );
}
