export interface User {
  name: string
  email: string
  city: string
  neighborhood: string
  favoriteSport: string
  createdAt: string
}

export interface SignupForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  city: string
  neighborhood: string
  favoriteSport: string
}
