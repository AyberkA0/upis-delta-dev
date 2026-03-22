import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import { authApi } from '../../api/auth'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import logoSvg from '../../assets/upisdelta.svg'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''

  const [password, setPassword]             = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword]     = useState(false)
  const [showConfirm, setShowConfirm]       = useState(false)
  const [error, setError]                   = useState('')
  const [success, setSuccess]               = useState(false)
  const [loading, setLoading]               = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password', { replace: true })
    }
  }, [token, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) { setError(t('auth.register.password_req_length')); return }
    if (!/[A-Z]/.test(password)) { setError(t('auth.register.password_req_uppercase')); return }
    if (!/[0-9]/.test(password)) { setError(t('auth.register.password_req_number')); return }
    if (!/[^a-zA-Z0-9]/.test(password)) { setError(t('auth.register.password_req_symbol')); return }
    if (password !== confirmPassword) { setError(t('auth.reset.passwords_not_match')); return }

    setLoading(true)
    try {
      await authApi.resetPassword(token, password)
      setSuccess(true)
    } catch {
      setError(t('auth.reset.error'))
    } finally {
      setLoading(false)
    }
  }

  const EyeIcon = ({ show }: { show: boolean }) => show ? (
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
  )

  const strengthChecks = [
    { label: t('auth.register.password_req_length'), ok: password.length >= 8 },
    { label: t('auth.register.password_req_uppercase'),  ok: /[A-Z]/.test(password) },
    { label: t('auth.register.password_req_number'),            ok: /[0-9]/.test(password) },
    { label: t('auth.register.password_req_symbol'), ok: /[^a-zA-Z0-9]/.test(password) },
  ]

  if (success) {
    useEffect(() => {
      if (success) {
        window.history.replaceState(null, '', '/login')
      }
    }, [success])

    return (
      <div style={{
        minHeight: '100vh', background: '#F4F6FA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Mono', monospace",
      }}>
        <div style={{
          textAlign: 'center', maxWidth: 440, padding: 48,
          background: '#fff',
          border: '1px solid rgba(47,82,133,0.10)',
          borderRadius: 20,
          boxShadow: '0 8px 40px rgba(47,82,133,0.07)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
          <h2 style={{
            // fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 700, color: '#0A0A0A', marginBottom: 12,
          }}>
            {t('auth.reset.success_title')}
          </h2>
          <p style={{ color: '#7A6B72', fontSize: 13, lineHeight: 1.8, marginBottom: 28 }}>
            {t('auth.reset.success_desc')}
          </p>
          <div
            onClick={() => navigate('/login')}
            style={{
              display: 'inline-block',
              background: 'rgba(100,112,146,0.5)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(208,232,253,0.5)',
              borderRadius: 30, padding: '12px 32px',
              fontSize: 14, color: '#e0ebe8', fontWeight: 600,
              fontFamily: "'DM Mono', monospace", cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(100,112,146,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(100,112,146,0.5)'}
          >
            {t('auth.reset.sign_in')}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#F4F6FA',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'DM Mono', monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Mono:wght@400;500;600&display=swap');
        .rp-input {
          width: 100%;
          background: #fff;
          border: 1px solid rgba(47,82,133,0.15);
          border-radius: 10px;
          padding: 11px 40px 11px 14px;
          font-size: 13px;
          font-family: 'DM Mono', monospace;
          color: #0A0A0A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rp-input:focus {
          border-color: rgba(47,82,133,0.4);
          box-shadow: 0 0 0 3px rgba(47,82,133,0.06);
        }
        .rp-input::placeholder { color: #A8BDD0; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{
        padding: '16px 40px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: '1px solid rgba(47,82,133,0.06)',
        background: '#fff',
      }}>
        <img src={logoSvg} height={26} style={{ cursor: 'pointer' }} onClick={() => navigate('/')} />
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
              {t('auth.reset.title')}
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#A8BDD0', lineHeight: 1.6 }}>
              {t('auth.reset.subtitle')}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '28px 36px 36px' }}>

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.06)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: 8, padding: '10px 14px',
                fontSize: 12, color: '#dc2626', marginBottom: 20,
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                {t('auth.reset.new_password')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="rp-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.reset.password_placeholder')}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoFocus
                />
                <div
                  onClick={() => setShowPassword(s => !s)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer', color: '#A8BDD0',
                    display: 'flex', alignItems: 'center', transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
                  onMouseLeave={e => e.currentTarget.style.color = '#A8BDD0'}
                >
                  <EyeIcon show={showPassword} />
                </div>
              </div>
            </div>

            {password.length > 0 && (
              <div style={{
                background: 'rgba(47,82,133,0.03)',
                border: '1px solid rgba(47,82,133,0.08)',
                borderRadius: 8, padding: '10px 14px',
                marginBottom: 14,
              }}>
                {strengthChecks.map(check => (
                  <div key={check.label} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontSize: 11, color: check.ok ? '#16a34a' : '#A8BDD0',
                    marginBottom: 4,
                  }}>
                    <span>{check.ok ? '✓' : '○'}</span>
                    <span>{check.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                {t('auth.reset.confirm_password')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`rp-input ${confirmPassword && password !== confirmPassword ? 'border-color:rgba(239,68,68,0.5)' : ''}`}
                  type={showConfirm ? 'text' : 'password'}
                  placeholder={t('auth.reset.confirm_password_placeholder')}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  style={{
                    borderColor: confirmPassword && password !== confirmPassword
                      ? 'rgba(239,68,68,0.5)' : undefined
                  }}
                />
                <div
                  onClick={() => setShowConfirm(s => !s)}
                  style={{
                    position: 'absolute', right: 12, top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer', color: '#A8BDD0',
                    display: 'flex', alignItems: 'center', transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#2F5285'}
                  onMouseLeave={e => e.currentTarget.style.color = '#A8BDD0'}
                >
                  <EyeIcon show={showConfirm} />
                </div>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <div style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>
                  {t('auth.reset.passwords_not_match')}
                </div>
              )}
            </div>

            <div
              onClick={!loading ? handleSubmit as unknown as React.MouseEventHandler : undefined}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: loading ? 'rgba(100,112,146,0.3)' : 'rgba(100,112,146,0.5)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(208,232,253,0.5)',
                borderRadius: 30, padding: '13px 36px',
                fontSize: 16, color: '#ffffff', fontWeight: 600,
                fontFamily: "'DM Mono', monospace",
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', width: '100%',
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = 'rgba(100,112,146,0.3)' }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = 'rgba(100,112,146,0.5)' }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 14, height: 14,
                    border: '2px solid rgba(224,235,232,0.3)',
                    borderTopColor: '#e0ebe8', borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                  }} />
                  {t('auth.reset.loading')}
                </>
              ) : t('auth.reset.button')}
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
