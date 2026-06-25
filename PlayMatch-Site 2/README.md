# PlayMatch

Plataforma para conectar pessoas que querem jogar esportes — encontre partidas, crie jogos e conheça novos jogadores.

**Slogan:** *Conectando pessoas através do esporte.*

## Tecnologias

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- React Router
- Lucide React (ícones)

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173) no navegador.

## Scripts disponíveis

| Comando         | Descrição                    |
|-----------------|------------------------------|
| `npm run dev`   | Servidor de desenvolvimento  |
| `npm run build` | Build de produção            |
| `npm run preview` | Preview do build           |

## Páginas

| Rota               | Descrição                          |
|--------------------|------------------------------------|
| `/`                | Página inicial                     |
| `/partidas`        | Lista de partidas disponíveis      |
| `/partidas/:id`    | Detalhes de uma partida            |
| `/criar-partida`   | Formulário para criar partida      |
| `/cadastro`        | Criar conta de jogador             |
| `/perfil`          | Dados e atividade do jogador       |
| `/comunidade`      | Publicações e interação            |
| `/sobre`           | Sobre a PlayMatch                  |

## Funcionalidades

- Cadastro de jogadores com bairro para partidas próximas
- Perfil do jogador com dados e estatísticas
- Comunidade com publicações, curtidas e comentários
- Listagem de partidas com dados simulados
- Filtro por esporte, nível e busca por texto
- Detalhes completos de cada partida
- Participação simulada em partidas
- Criação de partidas salvas no `localStorage`
- Layout responsivo para mobile e desktop

## Estrutura do projeto

```
src/
├── components/     # Header, Footer, MatchCard, Button, Layout
├── context/        # MatchesContext (estado global + localStorage)
├── data/           # Dados simulados de partidas
├── pages/          # Páginas da aplicação
├── types/          # Tipos TypeScript
├── App.tsx
└── main.tsx
```

## Deploy

O projeto pode ser publicado no GitHub e deployado em plataformas como Vercel, Netlify ou GitHub Pages.

```bash
npm run build
```

Os arquivos de produção ficam na pasta `dist/`.
