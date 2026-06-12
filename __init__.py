import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trophy, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Criar conta — PlayMatch" }, { name: "description", content: "Crie sua conta gratuita no PlayMatch." }] }),
  component: SignupPage,
});

const sports = ["Futebol", "Basquete", "Vôlei", "Tênis", "Beach Tennis", "Futsal"];

function SignupPage() {
  const navigate = useNavigate();
  const [picked, setPicked] = useState<string[]>(["Futebol"]);
  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  return (
    <div className="min-h-screen px-5 py-8" style={{ background: "var(--gradient-mesh)" }}>
      <div className="mx-auto max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Voltar
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold">Crie sua conta</h1>
            <p className="text-sm text-muted-foreground">Leva menos de 1 minuto</p>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/feed" }); }}
          className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
        >
          <Field icon={<User className="h-4 w-4" />} label="Nome">
            <input required placeholder="Seu nome" className="input-field" />
          </Field>
          <Field icon={<Mail className="h-4 w-4" />} label="E-mail">
            <input type="email" required placeholder="voce@email.com" className="input-field" />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} label="Senha">
            <input type="password" required placeholder="Mínimo 8 caracteres" className="input-field" />
          </Field>

          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">Esportes favoritos</span>
            <div className="flex flex-wrap gap-2">
              {sports.map((s) => {
                const on = picked.includes(s);
                return (
                  <button
                    type="button"
                    key={s}
                    onClick={() => toggle(s)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                      on
                        ? "border-transparent text-primary-foreground"
                        : "border-border bg-secondary text-foreground hover:border-primary/40"
                    }`}
                    style={on ? { background: "var(--gradient-hero)" } : undefined}
                  >
                    {s}
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
            Criar minha conta
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Já tem conta? <Link to="/login" className="font-semibold text-primary">Entrar</Link>
          </p>
        </form>
      </div>
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
