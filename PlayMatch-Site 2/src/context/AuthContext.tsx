import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { SignupForm, User } from '../types/user'

const STORAGE_KEY = 'playmatch-user'

interface AuthContextValue {
  user: User | null
  isLoggedIn: boolean
  register: (form: SignupForm) => User
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as User & { neighborhood?: string }
    return {
      ...parsed,
      neighborhood: parsed.neighborhood ?? '',
    }
  } catch {
    return null
  }
}

function saveUser(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser)

  const register = useCallback((form: SignupForm): User => {
    const newUser: User = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      city: form.city.trim(),
      neighborhood: form.neighborhood.trim(),
      favoriteSport: form.favoriteSport,
      createdAt: new Date().toISOString(),
    }
    saveUser(newUser)
    setUser(newUser)
    return newUser
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: user !== null,
      register,
      logout,
    }),
    [user, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
