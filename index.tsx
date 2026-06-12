export type Sport = "Futebol" | "Basquete" | "Vôlei" | "Tênis" | "Beach Tennis" | "Futsal";

export interface Match {
  id: string;
  title: string;
  sport: Sport;
  location: string;
  date: string;
  time: string;
  organizer: string;
  organizerAvatar: string;
  participants: number;
  maxParticipants: number;
  level: "Iniciante" | "Intermediário" | "Avançado" | "Todos";
  price: string;
  image: string;
  confirmed?: boolean;
}

export const sportEmoji: Record<Sport, string> = {
  Futebol: "⚽",
  Basquete: "🏀",
  Vôlei: "🏐",
  Tênis: "🎾",
  "Beach Tennis": "🏖️",
  Futsal: "⚽",
};

export const mockMatches: Match[] = [
  {
    id: "1",
    title: "Pelada de quinta no Ibirapuera",
    sport: "Futebol",
    location: "Parque Ibirapuera, SP",
    date: "Hoje",
    time: "19:30",
    organizer: "Lucas Andrade",
    organizerAvatar: "LA",
    participants: 8,
    maxParticipants: 12,
    level: "Intermediário",
    price: "R$ 15",
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&q=80",
    confirmed: true,
  },
  {
    id: "2",
    title: "Basquete 3x3 no fim de tarde",
    sport: "Basquete",
    location: "Quadra Vila Madalena",
    date: "Amanhã",
    time: "18:00",
    organizer: "Marina Costa",
    organizerAvatar: "MC",
    participants: 4,
    maxParticipants: 6,
    level: "Todos",
    price: "Grátis",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
  },
  {
    id: "3",
    title: "Beach Tennis para iniciantes",
    sport: "Beach Tennis",
    location: "Arena Praia, Santos",
    date: "Sáb 11/05",
    time: "09:00",
    organizer: "Rafa Oliveira",
    organizerAvatar: "RO",
    participants: 6,
    maxParticipants: 8,
    level: "Iniciante",
    price: "R$ 25",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80",
  },
  {
    id: "4",
    title: "Vôlei misto de domingo",
    sport: "Vôlei",
    location: "Clube Pinheiros",
    date: "Dom 12/05",
    time: "10:00",
    organizer: "Bia Mendes",
    organizerAvatar: "BM",
    participants: 10,
    maxParticipants: 12,
    level: "Avançado",
    price: "R$ 20",
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&q=80",
  },
];
