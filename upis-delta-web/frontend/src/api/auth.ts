import client from './client'

interface AuthResponse {
  token: string
  pid: string
  name: string
  email: string
  is_verified: boolean
  permission_level: number
  plan_code: number
}

export const authApi = {
  login: (email: string, password: string) =>
    client.post<AuthResponse>('/auth/login', { email, password }),

  register: (name: string, email: string, password: string) =>
    client.post<AuthResponse>('/auth/register', { name, email, password }),

  forgotPassword: (email: string) =>
    client.post('/auth/forgot', { email }),

  resetPassword: (token: string, password: string) =>
    client.post('/auth/reset', { token, password }),

  resendVerificationEmail: (email: string) =>
    client.post("/auth/resend-verification-mail", { email })
}