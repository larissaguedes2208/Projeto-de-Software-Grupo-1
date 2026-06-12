@import "tailwindcss" source(none);
@source "../src";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-display: 'Sora', system-ui, sans-serif;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-glow: var(--primary-glow);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent-glow: var(--accent-glow);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}

:root {
  --radius: 1rem;

  --background: oklch(0.985 0.005 240);
  --foreground: oklch(0.18 0.04 250);

  --card: oklch(1 0 0);
  --card-foreground: oklch(0.18 0.04 250);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.18 0.04 250);

  /* Deep electric blue */
  --primary: oklch(0.48 0.18 255);
  --primary-foreground: oklch(0.99 0 0);
  --primary-glow: oklch(0.62 0.19 250);

  /* Vibrant orange */
  --accent: oklch(0.72 0.18 50);
  --accent-foreground: oklch(0.15 0.02 250);
  --accent-glow: oklch(0.78 0.17 65);

  --secondary: oklch(0.96 0.01 250);
  --secondary-foreground: oklch(0.25 0.04 255);

  --muted: oklch(0.95 0.01 250);
  --muted-foreground: oklch(0.5 0.03 255);

  --success: oklch(0.7 0.16 155);
  --success-foreground: oklch(0.99 0 0);

  --destructive: oklch(0.6 0.22 27);
  --destructive-foreground: oklch(0.99 0 0);

  --border: oklch(0.92 0.01 250);
  --input: oklch(0.94 0.01 250);
  --ring: oklch(0.48 0.18 255);

  --gradient-hero: linear-gradient(135deg, var(--primary) 0%, var(--primary-glow) 60%, var(--accent) 130%);
  --gradient-accent: linear-gradient(135deg, var(--accent) 0%, var(--accent-glow) 100%);
  --gradient-card: linear-gradient(160deg, oklch(1 0 0) 0%, oklch(0.97 0.015 255) 100%);
  --gradient-mesh: radial-gradient(at 10% 0%, oklch(0.62 0.19 250 / 0.25) 0px, transparent 50%),
                   radial-gradient(at 90% 10%, oklch(0.78 0.17 65 / 0.2) 0px, transparent 50%),
                   radial-gradient(at 50% 100%, oklch(0.48 0.18 255 / 0.18) 0px, transparent 60%);

  --shadow-soft: 0 4px 16px -4px oklch(0.48 0.18 255 / 0.12);
  --shadow-elevated: 0 20px 50px -20px oklch(0.48 0.18 255 / 0.35);
  --shadow-accent: 0 12px 30px -10px oklch(0.72 0.18 50 / 0.5);

  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark {
  --background: oklch(0.16 0.03 255);
  --foreground: oklch(0.97 0.01 250);
  --card: oklch(0.22 0.04 255);
  --card-foreground: oklch(0.97 0.01 250);
  --popover: oklch(0.22 0.04 255);
  --popover-foreground: oklch(0.97 0.01 250);
  --primary: oklch(0.65 0.19 250);
  --primary-foreground: oklch(0.12 0.03 255);
  --primary-glow: oklch(0.72 0.18 245);
  --accent: oklch(0.75 0.18 55);
  --accent-foreground: oklch(0.12 0.02 255);
  --accent-glow: oklch(0.82 0.16 65);
  --secondary: oklch(0.27 0.04 255);
  --secondary-foreground: oklch(0.97 0.01 250);
  --muted: oklch(0.26 0.03 255);
  --muted-foreground: oklch(0.7 0.03 255);
  --border: oklch(1 0 0 / 8%);
  --input: oklch(1 0 0 / 12%);
  --ring: oklch(0.65 0.19 250);
}

@layer base {
  * { border-color: var(--color-border); }
  html, body { font-family: var(--font-sans); }
  body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4 { font-family: var(--font-display); letter-spacing: -0.02em; }
}
