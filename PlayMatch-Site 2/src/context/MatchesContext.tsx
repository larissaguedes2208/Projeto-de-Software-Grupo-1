import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { mockMatches } from '../data/mockMatches'
import { DEFAULT_CITY } from '../data/rioNeighborhoods'
import type { CreateMatchForm, Match } from '../types/match'
import { buildMatchLocation, extractNeighborhoodFromLocation } from '../utils/location'

const STORAGE_KEY = 'playmatch-created-matches'

interface MatchesContextValue {
  matches: Match[]
  getMatchById: (id: string) => Match | undefined
  createMatch: (form: CreateMatchForm, organizerName: string) => Match
  joinMatch: (id: string, playerName: string) => boolean
}

const MatchesContext = createContext<MatchesContextValue | null>(null)

function normalizeMatch(match: Match): Match {
  return {
    ...match,
    neighborhood:
      match.neighborhood || extractNeighborhoodFromLocation(match.location) || '',
  }
}

function loadStoredMatches(): Match[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return (JSON.parse(raw) as Match[]).map(normalizeMatch)
  } catch {
    return []
  }
}

function saveStoredMatches(matches: Match[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(matches))
}

export function MatchesProvider({ children }: { children: ReactNode }) {
  const [userMatches, setUserMatches] = useState<Match[]>(loadStoredMatches)

  const matches = useMemo(
    () => [...userMatches, ...mockMatches],
    [userMatches],
  )

  const getMatchById = useCallback(
    (id: string) => matches.find((m) => m.id === id),
    [matches],
  )

  const createMatch = useCallback(
    (form: CreateMatchForm, organizerName: string): Match => {
      const newMatch: Match = {
        id: `user-${Date.now()}`,
        sport: form.sport,
        neighborhood: form.neighborhood,
        location: buildMatchLocation(form.venue, form.neighborhood, DEFAULT_CITY),
        date: form.date,
        time: form.time,
        spots: form.spots,
        maxSpots: form.spots,
        level: form.level,
        description: form.description,
        organizer: organizerName,
        participants: [organizerName],
      }

    setUserMatches((prev) => {
      const updated = [newMatch, ...prev]
      saveStoredMatches(updated)
      return updated
    })

    return newMatch
  }, [])

  const joinMatch = useCallback(
    (id: string, playerName: string): boolean => {
      const match = matches.find((m) => m.id === id)
      if (!match || match.spots <= 0) return false
      if (match.participants.includes(playerName)) return true

      const updated: Match = {
        ...match,
        spots: match.spots - 1,
        participants: [...match.participants, playerName],
      }

      const isUserMatch = id.startsWith('user-')
      if (isUserMatch) {
        setUserMatches((prev) => {
          const next = prev.map((m) => (m.id === id ? updated : m))
          saveStoredMatches(next)
          return next
        })
      } else {
        setUserMatches((prev) => {
          const withoutDuplicate = prev.filter((m) => m.id !== id)
          const next = [updated, ...withoutDuplicate]
          saveStoredMatches(next)
          return next
        })
      }

      return true
    },
    [matches],
  )

  const value = useMemo(
    () => ({ matches, getMatchById, createMatch, joinMatch }),
    [matches, getMatchById, createMatch, joinMatch],
  )

  return (
    <MatchesContext.Provider value={value}>{children}</MatchesContext.Provider>
  )
}

export function useMatches() {
  const ctx = useContext(MatchesContext)
  if (!ctx) {
    throw new Error('useMatches must be used within MatchesProvider')
  }
  return ctx
}
