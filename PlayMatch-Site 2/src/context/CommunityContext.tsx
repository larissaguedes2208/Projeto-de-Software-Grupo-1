import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { mockCommunityPosts } from '../data/mockCommunityPosts'
import type { CommunityPost, CreatePostForm } from '../types/community'

const STORAGE_KEY = 'playmatch-community-posts'

interface CommunityContextValue {
  posts: CommunityPost[]
  addPost: (form: CreatePostForm, author: string, authorCity: string) => CommunityPost
  toggleLike: (postId: string, userName: string) => void
  addComment: (postId: string, author: string, content: string) => void
}

const CommunityContext = createContext<CommunityContextValue | null>(null)

function loadUserPosts(): CommunityPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as CommunityPost[]
  } catch {
    return []
  }
}

function saveUserPosts(posts: CommunityPost[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

function mergePosts(userPosts: CommunityPost[]): CommunityPost[] {
  const userIds = new Set(userPosts.map((p) => p.id))
  const merged = [...userPosts]

  for (const mock of mockCommunityPosts) {
    const override = userPosts.find((p) => p.id === mock.id)
    if (override) continue
    if (!userIds.has(mock.id)) merged.push(mock)
  }

  return merged.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export function CommunityProvider({ children }: { children: ReactNode }) {
  const [userPosts, setUserPosts] = useState<CommunityPost[]>(loadUserPosts)

  const posts = useMemo(() => mergePosts(userPosts), [userPosts])

  const persist = useCallback((updater: (prev: CommunityPost[]) => CommunityPost[]) => {
    setUserPosts((prev) => {
      const next = updater(prev)
      saveUserPosts(next)
      return next
    })
  }, [])

  const addPost = useCallback(
    (form: CreatePostForm, author: string, authorCity: string): CommunityPost => {
      const newPost: CommunityPost = {
        id: `user-post-${Date.now()}`,
        author,
        authorCity,
        sport: form.sport,
        content: form.content.trim(),
        createdAt: new Date().toISOString(),
        likes: [],
        comments: [],
      }

      persist((prev) => [newPost, ...prev])
      return newPost
    },
    [persist],
  )

  const toggleLike = useCallback(
    (postId: string, userName: string) => {
      persist((prev) => {
        const existing = prev.find((p) => p.id === postId)
        if (existing) {
          return prev.map((p) => {
            if (p.id !== postId) return p
            const liked = p.likes.includes(userName)
            return {
              ...p,
              likes: liked
                ? p.likes.filter((n) => n !== userName)
                : [...p.likes, userName],
            }
          })
        }

        const mock = mockCommunityPosts.find((p) => p.id === postId)
        if (!mock) return prev

        const liked = mock.likes.includes(userName)
        const updated: CommunityPost = {
          ...mock,
          likes: liked
            ? mock.likes.filter((n) => n !== userName)
            : [...mock.likes, userName],
        }
        return [updated, ...prev]
      })
    },
    [persist],
  )

  const addComment = useCallback(
    (postId: string, author: string, content: string) => {
      const comment = {
        id: `comment-${Date.now()}`,
        author,
        content: content.trim(),
        createdAt: new Date().toISOString(),
      }

      persist((prev) => {
        const existing = prev.find((p) => p.id === postId)
        if (existing) {
          return prev.map((p) =>
            p.id === postId ? { ...p, comments: [...p.comments, comment] } : p,
          )
        }

        const mock = mockCommunityPosts.find((p) => p.id === postId)
        if (!mock) return prev

        const updated: CommunityPost = {
          ...mock,
          comments: [...mock.comments, comment],
        }
        return [updated, ...prev]
      })
    },
    [persist],
  )

  const value = useMemo(
    () => ({ posts, addPost, toggleLike, addComment }),
    [posts, addPost, toggleLike, addComment],
  )

  return (
    <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>
  )
}

export function useCommunity() {
  const ctx = useContext(CommunityContext)
  if (!ctx) {
    throw new Error('useCommunity must be used within CommunityProvider')
  }
  return ctx
}
