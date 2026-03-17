import client from './client'

interface AuthResponse {
  token: string
  pid: string
  name: string
  is_verified: boolean
}

export const authApi = {
  login: (email: string, password: string) =>
    client.post<AuthResponse>('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    client.post<AuthResponse>('/auth/register', { name, email, password }),
}
