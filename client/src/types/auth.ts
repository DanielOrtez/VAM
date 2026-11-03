import type { ErrorResponse } from './api'

export type UserLogin = {
  email: string
  password: string
}

export type UserSession = {
  id: number
  display: string
  has_usable_password: boolean
  email: string
  username: string
}

type MethodsSession = {
  method: string
  at: number
  email?: string
  username?: string
}

type SessionData = {
  user?: UserSession
  methods?: MethodsSession[]
  flows?: Record<string, string>[]
}

type SessionMeta = {
  is_authenticated: boolean
  session_token?: string
  access_token?: string
}

export type SessionResponse = {
  status: number
  data?: SessionData
  errors?: ErrorResponse[]
  meta?: SessionMeta
}
