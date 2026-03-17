import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi } from '../api/auth'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Register() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await authApi.register(name, email, password)
      setIsRegistrationSuccess(true)
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { error?: string } } })
          ?.response?.data?.error ?? t('auth.register.error')
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (isRegistrationSuccess) {
    return (
      <div style={{ maxWidth: 400, margin: '100px auto', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>✉️</div>
        <h2 style={{ color: '#00d4a8', marginBottom: 12 }}>{t('auth.register.success_title')}</h2>
        <p style={{ color: '#5a6a7e', marginBottom: 24 }}>
          <strong style={{ color: '#e8edf5' }}>{email}</strong>{' '}
          {t('auth.register.success_desc')}
        </p>
        <button
          onClick={() => navigate('/login')}
          style={{ padding: '10px 24px', background: '#00d4a8', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
        >
          {t('auth.register.go_login')}
        </button>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <LanguageSwitcher />
      </div>

      <h1>{t('auth.register.title')}</h1>

      {error && <p style={{ color: '#ff4757', margin: '12px 0' }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
        <input
          type="text"
          placeholder={t('auth.register.name')}
          value={name}
          onChange={e => setName(e.target.value)}
          required
          style={{ padding: 10, background: '#111', border: '1px solid #333', color: '#fff', borderRadius: 4 }}
        />
        <input
          type="email"
          placeholder={t('auth.register.email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ padding: 10, background: '#111', border: '1px solid #333', color: '#fff', borderRadius: 4 }}
        />
        <input
          type="password"
          placeholder={t('auth.register.password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={8}
          style={{ padding: 10, background: '#111', border: '1px solid #333', color: '#fff', borderRadius: 4 }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{ padding: 10, background: '#00d4a8', color: '#000', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 700 }}
        >
          {isLoading ? t('auth.register.loading') : t('auth.register.button')}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 16, color: '#5a6a7e', fontSize: 13 }}>
        {t('auth.register.has_account')}{' '}
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'none', border: 'none', color: '#00d4a8', cursor: 'pointer', fontSize: 13 }}
        >
          {t('auth.register.login_link')}
        </button>
      </div>
    </div>
  )
}