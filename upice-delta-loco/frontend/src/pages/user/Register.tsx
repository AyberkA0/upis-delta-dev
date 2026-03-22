import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { authApi } from '../../api/auth'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import logoSvg from '../../assets/upisdelta.svg'

const ALLOWED_DOMAINS = [
  'gmail.com', 'outlook.com', 'hotmail.com',
  'proton.me', 'protonmail.com', 'pm.me',
]

function validateEmail(email: string): string | null {
  const lower = email.toLowerCase()
  const parts = lower.split('@')
  if (parts.length !== 2) return 'invalid_email'
  const [local, domain] = parts
  if (!local || !domain) return 'invalid_email'
  if (local.includes('+') || local.includes('.')) return 'alias_email_error'
  if (!ALLOWED_DOMAINS.includes(domain)) return 'domain_error'
  return null
}

export default function Register() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeTerms, setAgreeTerms]     = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const [agreeAge, setAgreeAge]         = useState(false)
  const [error, setError]       = useState('')
  const [success, setSuccess]   = useState(false)
  const [loading, setLoading]   = useState(false)
  const [emailError, setEmailError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const resolveEmailError = (key: string | null): string => {
    if (!key) return ''
    if (key === 'domain_error') return t('auth.register.domain_error', { domains: ALLOWED_DOMAINS.join(', ') })
    return t(`auth.register.${key}`)
  }

  const handleEmailChange = (val: string) => {
    setEmail(val)
    if (val.includes('@')) {
      const key = validateEmail(val)
      setEmailError(resolveEmailError(key))
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const emailErrKey = validateEmail(email)
    if (emailErrKey) { setError(resolveEmailError(emailErrKey)); return }
    if (password !== confirmPassword) { setError(t('auth.register.passwords_not_match')); return }
    if (password.length < 8) { setError(t('auth.register.password_req_length')); return }
    if (!/[A-Z]/.test(password)) { setError(t('auth.register.password_req_uppercase')); return }
    if (!/[0-9]/.test(password)) { setError(t('auth.register.password_req_number')); return }
    if (!/[^a-zA-Z0-9]/.test(password)) { setError(t('auth.register.password_req_symbol')); return }
    if (!agreeTerms || !agreePrivacy || !agreeAge) {
      setError(t('auth.register.accept_agreements'))
      return
    }

    setLoading(true)
    try {
      await authApi.register(name, email, password)
      setSuccess(true)
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { error?: string } } })
          ?.response?.data?.error ?? t('auth.register.error')
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{
        minHeight: '100vh', background: '#FAFAFA',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'DM Mono', monospace",
      }}>
        <div style={{
          textAlign: 'center', maxWidth: 440, padding: 48,
          background: 'rgba(255,255,255,0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(47,82,133,0.1)',
          borderRadius: 20,
          boxShadow: '0 8px 32px rgba(47,82,133,0.08)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 20 }}>✉️</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 24, fontWeight: 700, color: '#0A0A0A', marginBottom: 12,
          }}>
            {t('auth.register.success_title')}
          </h2>
          <p style={{ color: '#7A6B72', fontSize: 13, lineHeight: 1.7, marginBottom: 28 }}>
            <strong style={{ color: '#0A0A0A' }}>{email}</strong>
            {' '}{t('auth.register.success_desc')}
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
            {t('auth.register.go_login')}
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
        .reg-input {
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
        .reg-input:focus {
          border-color: rgba(47,82,133,0.4);
          box-shadow: 0 0 0 3px rgba(47,82,133,0.06);
        }
        .reg-input.error {
          border-color: rgba(239,68,68,0.5);
        }
        .reg-input::placeholder { color: #A8BDD0; }
        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(47,82,133,0.06);
        }
        .checkbox-row:last-child { border-bottom: none; }
        .custom-checkbox {
          width: 16px; height: 16px;
          border: 1.5px solid rgba(47,82,133,0.3);
          border-radius: 4px;
          cursor: pointer;
          flex-shrink: 0;
          margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
          background: #fff;
        }
        .custom-checkbox.checked {
          background: #2F5285;
          border-color: #2F5285;
        }
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
              {t('auth.register.subtitle')}
            </div>
            {/* <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 26, fontWeight: 700, color: '#0A0A0A', letterSpacing: -0.3,
            }}>
              {t('auth.register.title')}
            </h1> */}
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
                {t('auth.register.name')}
              </label>
              <input
                className="reg-input"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                {t('auth.register.email')}
              </label>
              <input
                className={`reg-input ${emailError ? 'error' : ''}`}
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={e => handleEmailChange(e.target.value)}
                required
              />
              {emailError && (
                <div style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>
                  {emailError}
                </div>
              )}
              {/* <div style={{ fontSize: 11, color: '#A8BDD0', marginTop: 4 }}>
                Accepted: Gmail, Outlook, Hotmail, Proton
              </div> */}
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                {t('auth.register.password')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="reg-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('auth.register.password_placeholder')}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={8}
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
              {password.length > 0 && (
                <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {[
                    { ok: password.length >= 8, label: t('auth.register.password_req_length') },
                    { ok: /[A-Z]/.test(password), label: t('auth.register.password_req_uppercase') },
                    { ok: /[0-9]/.test(password), label: t('auth.register.password_req_number') },
                    { ok: /[^a-zA-Z0-9]/.test(password), label: t('auth.register.password_req_symbol') },
                  ].map((r, i) => (
                    <div key={i} style={{ fontSize: 11, color: r.ok ? '#16a34a' : '#dc2626', display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontSize: 10 }}>{r.ok ? '✓' : '✗'}</span> {r.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                {t('auth.register.confirm_password')}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`reg-input ${confirmPassword && password !== confirmPassword ? 'error' : ''}`}
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t('auth.register.confirm_password_placeholder')}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  style={{ paddingRight: 40 }}
                />
                <div
                  onClick={() => setShowConfirmPassword(s => !s)}
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
                  {showConfirmPassword ? (
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
              {confirmPassword && password !== confirmPassword && (
                <div style={{ fontSize: 11, color: '#dc2626', marginTop: 4 }}>
                  {t('auth.register.passwords_not_match')}
                </div>
              )}
            </div>

            <div style={{
              background: 'rgba(47,82,133,0.03)',
              border: '1px solid rgba(47,82,133,0.08)',
              borderRadius: 10, padding: '4px 14px',
              marginBottom: 24,
            }}>
              {[
                {
                  key: 'terms', checked: agreeTerms, set: setAgreeTerms,
                  text: t('auth.register.agree_terms_prefix'),
                  link: t('auth.register.terms_of_service'), href: '/terms',
                },
                {
                  key: 'privacy', checked: agreePrivacy, set: setAgreePrivacy,
                  text: t('auth.register.agree_privacy_prefix'),
                  link: t('auth.register.privacy_policy'), href: '/privacy',
                },
                {
                  key: 'age', checked: agreeAge, set: setAgreeAge,
                  text: t('auth.register.agree_age'),
                  link: null, href: null,
                },
              ].map(item => (
                <div key={item.key} className="checkbox-row">
                  <div
                    className={`custom-checkbox ${item.checked ? 'checked' : ''}`}
                    onClick={() => item.set(!item.checked)}
                  >
                    {item.checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 12, color: '#5a6a7e', lineHeight: 1.6, cursor: 'default' }}
                    onClick={() => item.set(!item.checked)}
                  >
                    {item.text}
                    {item.link && (
                      <a
                        href={item.href || '#'}
                        style={{ color: '#2F5285', textDecoration: 'underline' }}
                        onClick={e => e.stopPropagation()}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.link}
                      </a>
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div
              onClick={!loading ? handleSubmit as unknown as React.MouseEventHandler : undefined}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: loading || !agreeTerms || !agreePrivacy || !agreeAge
                  ? 'rgba(111, 126, 101, 0.3)'
                  : 'rgba(108, 168, 24, 0.5)',
                backdropFilter: 'blur(6px)',
                border: '1px solid rgba(208,232,253,0.5)',
                borderRadius: 30, padding: '13px 36px',
                fontSize: 16, color: '#ffffff', fontWeight: 600,
                fontFamily: "'DM Mono', monospace",
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s', width: '100%',
                opacity: !agreeTerms || !agreePrivacy || !agreeAge ? 0.6 : 1,
              }}
              onMouseEnter={e => {
                if (!(loading || !agreeTerms || !agreePrivacy || !agreeAge))
                  e.currentTarget.style.background = 'rgba(108, 168, 24, 0.4)'
              }}
              onMouseLeave={e => {
                if (loading || !agreeTerms || !agreePrivacy || !agreeAge)
                  e.currentTarget.style.background = 'rgba(111, 126, 101, 0.3)'
                else
                  e.currentTarget.style.background = 'rgba(108, 168, 24, 0.5)'
              }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 14, height: 14, border: '2px solid rgba(224,235,232,0.3)',
                    borderTopColor: '#e0ebe8', borderRadius: '50%',
                    animation: 'spin 0.6s linear infinite',
                  }} />
                  {t('auth.register.loading')}
                </>
              ) : t('auth.register.button')}
            </div>

            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#7A6B72' }}>
              {t('auth.register.has_account')}{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ color: '#2F5285', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {t('auth.register.login_link')}
              </span>
            </div>
          </form>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
