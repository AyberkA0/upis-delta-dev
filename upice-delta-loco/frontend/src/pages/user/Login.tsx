import { useState } from 'react'
import { data, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi } from '../../api/auth'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import logoSvg from '../../assets/upisdelta.svg'

export default function Login() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data } = await authApi.login(email, password)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify({ name: data.name, pid: data.pid, permission_level: data.permission_level, is_verified: data.is_verified, email: data.email, plan_code: data.plan_code }))
      navigate('/dashboard')
    } catch (err: unknown) {
      const serverMsg =
        (err as { response?: { data?: { error?: string } } })
          ?.response?.data?.error ?? ''

      const message = serverMsg.toLowerCase().includes('verify')
        ? 'Please verify your email address before signing in.'
        : serverMsg || t('auth.login.error')

      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#F4F6FA',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'DM Mono', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        .login-input {
          width: 100%;
          background: #fff;
          border: 1px solid rgba(47,82,133,0.15);
          border-radius: 10px;
          padding: 11px 14px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          color: #0A0A0A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-input:focus {
          border-color: rgba(47,82,133,0.4);
          box-shadow: 0 0 0 3px rgba(47,82,133,0.06);
        }
        .login-input::placeholder { color: #A8BDD0; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        padding: '16px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(47,82,133,0.06)',
        background: '#fff',
      }}>
        <img
          src={logoSvg} height={26}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />
        <LanguageSwitcher />
      </div>

      <div style={{
        flex: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '40px 24px',
      }}>
        <div style={{
          width: '100%', maxWidth: 480,
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.10)',
          borderRadius: 20,
          boxShadow: '0 8px 40px rgba(47,82,133,0.07)',
          overflow: 'hidden',
        }}>

          <div style={{
            padding: '32px 36px 24px',
            borderBottom: '1px solid rgba(47,82,133,0.06)',
          }}>
            <div style={{
              fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#7A6B72', marginBottom: 8,
            }}>
              {t('auth.login.subtitle')}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '28px 36px 36px' }}>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 8, padding: '10px 14px',
                fontSize: 12, color: '#dc2626',
                marginBottom: 20,
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                {t('auth.login.email')}
              </label>
              <input
                className="login-input"
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label style={{
                  fontSize: 11, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: '#7A6B72',
                }}>
                  {t('auth.login.password')}
                </label>
                <span
                  onClick={() => navigate('/forgot-password')}
                  style={{ fontSize: 11, color: '#2F5285', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Forgot password?
                </span>
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  className="login-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: 40 }}
                />
                <div
                  onClick={() => setShowPassword(s => !s)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer', color: '#A8BDD0',
                    display: 'flex', alignItems: 'center',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
                  onMouseLeave={e => e.currentTarget.style.color = '#A8BDD0'}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div
              onClick={!loading ? handleSubmit as unknown as React.MouseEventHandler : undefined}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: loading
                  ?  'rgba(111, 126, 101, 0.3)'
                  : 'rgba(108, 168, 24, 0.5)'
                ,
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(208,232,253,0.5)',
                borderRadius: 30, padding: '13px 36px',
                fontSize: 16, color: '#ffffff', fontWeight: 600,
                fontFamily: "'DM Mono', monospace",
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', width: '100%',
              }}
              onMouseEnter={e => {
                if (!loading) e.currentTarget.style.background = 'rgba(108, 168, 24, 0.4)'
              }}
              onMouseLeave={e => {
                if (!loading) e.currentTarget.style.background = 'rgba(108, 168, 24, 0.5)'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 14, height: 14,
                    border: '2px solid rgba(224,235,232,0.3)',
                    borderTopColor: '#e0ebe8', borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                  }} />
                  {t('auth.login.loading')}
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  {t('auth.login.button')}
                </>
              )}
            </div>

            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#7A6B72' }}>
              {t('auth.login.no_account')}{' '}
              <span
                onClick={() => navigate('/register')}
                style={{ color: '#2F5285', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {t('auth.login.register_link')}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
