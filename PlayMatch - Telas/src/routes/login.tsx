import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Trophy, Mail, Lock, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — PlayMatch" }, { name: "description", content: "Acesse sua conta PlayMatch." }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
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
            <h1 className="font-display text-3xl font-bold">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground">Bora pra próxima partida</p>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/feed" }); }}
          className="mt-8 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
        >
          <Field icon={<Mail className="h-4 w-4" />} label="E-mail">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="voce@email.com" className="input-field" />
          </Field>
          <Field icon={<Lock className="h-4 w-4" />} label="Senha">
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" required placeholder="••••••••" className="input-field" />
          </Field>

          <button
            type="submit"
            className="w-full rounded-2xl py-3.5 font-bold text-primary-foreground transition-all hover:scale-[1.01] active:scale-95"
            style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elevated)" }}
          >
            Entrar
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link to="/signup" className="font-semibold text-primary">Criar conta</Link>
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
