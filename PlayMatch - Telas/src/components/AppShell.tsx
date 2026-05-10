import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Home, PlusCircle, User, Calendar, Trophy } from "lucide-react";

type NavItem = { to: "/feed" | "/matches" | "/create" | "/profile"; label: string; icon: typeof Home; highlight?: boolean };
const navItems: NavItem[] = [
  { to: "/feed", label: "Feed", icon: Home },
  { to: "/matches", label: "Minhas", icon: Calendar },
  { to: "/create", label: "Criar", icon: PlusCircle, highlight: true },
  { to: "/profile", label: "Perfil", icon: User },
];

export function AppShell() {
  const location = useLocation();
  const hideNav = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      {!hideNav && (
        <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-5">
            <Link to="/feed" className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl text-lg font-bold text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                <Trophy className="h-5 w-5" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight">PlayMatch</span>
            </Link>
            <Link to="/profile" className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-sm font-semibold">
              JS
            </Link>
          </div>
        </header>
      )}

      <main className={hideNav ? "" : "mx-auto max-w-2xl px-5 pb-32 pt-6"}>
        <Outlet />
      </main>

      {!hideNav && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-2xl items-center justify-around px-2 py-2">
            {navItems.map(({ to, label, icon: Icon, highlight }) => {
              const active = location.pathname === to;
              if (highlight) {
                return (
                  <Link key={to} to={to} className="-mt-8 grid place-items-center">
                    <span
                      className="grid h-14 w-14 place-items-center rounded-2xl text-primary-foreground transition-transform hover:scale-105 active:scale-95"
                      style={{ background: "var(--gradient-accent)", boxShadow: "var(--shadow-accent)" }}
                    >
                      <Icon className="h-7 w-7" strokeWidth={2.5} />
                    </span>
                  </Link>
                );
              }
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex flex-1 flex-col items-center gap-0.5 rounded-xl py-2 text-xs font-medium transition-colors ${
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={active ? 2.5 : 2} />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
