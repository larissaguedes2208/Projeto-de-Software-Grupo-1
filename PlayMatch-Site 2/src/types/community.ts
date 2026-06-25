export interface Comment {
  id: string
  author: string
  content: string
  createdAt: string
}

export interface CommunityPost {
  id: string
  author: string
  authorCity: string
  sport: string
  content: string
  createdAt: string
  likes: string[]
  comments: Comment[]
}

export interface CreatePostForm {
  sport: string
  content: string
}
