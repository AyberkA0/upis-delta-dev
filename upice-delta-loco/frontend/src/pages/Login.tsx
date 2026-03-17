import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi } from '../api/auth'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { data } = await authApi.login(email, password)
      sessionStorage.setItem('authToken', data.token)
      sessionStorage.setItem('userData', JSON.stringify({ name: data.name, pid: data.pid }))
      navigate('/dashboard')
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { error?: string } } })
          ?.response?.data?.error ?? t('auth.login.error')
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <LanguageSwitcher />
      </div>

      <h1>{t('auth.login.title')}</h1>

      {error && <p style={{ color: '#ff4757', margin: '12px 0' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
        <input
          type="email"
          placeholder={t('auth.login.email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 10, background: '#111', border: '1px solid #333', color: '#fff', borderRadius: 4 }}
        />
        <input
          type="password"
          placeholder={t('auth.login.password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ padding: 10, background: '#111', border: '1px solid #333', color: '#fff', borderRadius: 4 }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: 10, background: '#00d4a8', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
        >
          {isLoading ? t('auth.login.loading') : t('auth.login.button')}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 16, color: '#5a6a7e', fontSize: 13 }}>
        {t('auth.login.no_account')}{' '}
        <button
          onClick={() => navigate('/register')}
          style={{ background: 'none', border: 'none', color: '#00d4a8', cursor: 'pointer', fontSize: 13 }}
        >
          {t('auth.login.register_link')}
        </button>
      </div>
    </div>
  )
}
