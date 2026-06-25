import type { CommunityPost } from '../types/community'

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'mock-1',
    author: 'Rafael Souza',
    authorCity: 'Copacabana, RJ',
    sport: 'Futebol',
    content:
      'Alguém anima uma pelada amanhã à noite na Zona Sul? Preciso de mais 4 jogadores para completar o time!',
    createdAt: '2026-06-25T14:30:00',
    likes: ['Juliana Ferreira', 'Carlos Mendes', 'Ana Silva'],
    comments: [
      {
        id: 'c1',
        author: 'Juliana Ferreira',
        content: 'Eu topo! Me manda o horário certinho.',
        createdAt: '2026-06-25T15:10:00',
      },
      {
        id: 'c2',
        author: 'Carlos Mendes',
        content: 'Posso levar mais um amigo, somos dois.',
        createdAt: '2026-06-25T15:45:00',
      },
    ],
  },
  {
    id: 'mock-2',
    author: 'Beatriz Campos',
    authorCity: 'Flamengo, RJ',
    sport: 'Corrida',
    content:
      'Grupo de corrida no Aterro todo sábado às 6h30. Ritmo leve, todos bem-vindos! 🏃‍♀️',
    createdAt: '2026-06-24T08:00:00',
    likes: ['Daniel Oliveira', 'Mariana Souza', 'Lucas Barbosa', 'Amanda Torres'],
    comments: [
      {
        id: 'c3',
        author: 'Daniel Oliveira',
        content: 'Participo sempre, galera super receptiva!',
        createdAt: '2026-06-24T09:20:00',
      },
    ],
  },
  {
    id: 'mock-3',
    author: 'Gabriel Pinto',
    authorCity: 'Botafogo, RJ',
    sport: 'Tênis',
    content:
      'Procuro parceiro de tênis nível intermediário para treinar 2x por semana. Quadra no Botafogo.',
    createdAt: '2026-06-23T18:00:00',
    likes: ['Pedro Costa'],
    comments: [],
  },
  {
    id: 'mock-4',
    author: 'Amanda Torres',
    authorCity: 'Barra da Tijuca, RJ',
    sport: 'Beach Tennis',
    content:
      'Quem joga beach tennis na Barra? Montei um grupo no WhatsApp para combinar jogos no fim de semana.',
    createdAt: '2026-06-22T11:30:00',
    likes: ['Bianca Lima', 'Ricardo Nunes', 'Felipe Rocha'],
    comments: [
      {
        id: 'c4',
        author: 'Bianca Lima',
        content: 'Me adiciona! Jogo todo domingo de manhã.',
        createdAt: '2026-06-22T12:00:00',
      },
    ],
  },
  {
    id: 'mock-5',
    author: 'Lucas Barbosa',
    authorCity: 'Ipanema, RJ',
    sport: 'Futevôlei',
    content:
      'Altinha no Posto 9 hoje à tarde! Vem quem quiser, ambiente super descontraído na areia.',
    createdAt: '2026-06-25T10:00:00',
    likes: ['Tiago Mendes', 'Vanessa Moura'],
    comments: [
      {
        id: 'c5',
        author: 'Tiago Mendes',
        content: 'Chego umas 16h!',
        createdAt: '2026-06-25T10:30:00',
      },
    ],
  },
]
