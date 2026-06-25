export type SkillLevel = 'Iniciante' | 'Intermediário' | 'Avançado' | 'Todos os níveis'

export interface Match {
  id: string
  sport: string
  location: string
  neighborhood: string
  date: string
  time: string
  spots: number
  maxSpots: number
  level: SkillLevel
  description: string
  organizer: string
  participants: string[]
}

export interface CreateMatchForm {
  sport: string
  venue: string
  neighborhood: string
  date: string
  time: string
  spots: number
  level: SkillLevel
  description: string
}
