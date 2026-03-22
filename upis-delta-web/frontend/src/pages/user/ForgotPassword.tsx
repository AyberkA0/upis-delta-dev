import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from '../../../node_modules/react-i18next'
import { authApi } from '../../api/auth'
import LanguageSwitcher from '../../components/LanguageSwitcher'
import logoSvg from '../../assets/upisdelta.svg'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await authApi.forgotPassword(email)
      setSuccess(true)
    } catch {
      setError(t('auth.forgot.error'))
    } finally {
      setLoading(false)
    }
  }

  if (success) {
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
          <div style={{ fontSize: 48, marginBottom: 20 }}>📬</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 700, color: '#0A0A0A', marginBottom: 12,
          }}>
            {t('auth.forgot.success_title')}
          </h2>
          <p style={{ color: '#7A6B72', fontSize: 13, lineHeight: 1.8, marginBottom: 28 }}>
            {t('auth.forgot.success_desc_prefix')} <strong style={{ color: '#0A0A0A' }}>{email}</strong>,
            {t('auth.forgot.success_desc')}
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
            {t('auth.forgot.back_to_login')}
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
        .fp-input {
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
        .fp-input:focus {
          border-color: rgba(47,82,133,0.4);
          box-shadow: 0 0 0 3px rgba(47,82,133,0.06);
        }
        .fp-input::placeholder { color: #A8BDD0; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Top bar */}
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

          {/* Header */}
          <div style={{
            padding: '32px 36px 24px',
            borderBottom: '1px solid rgba(47,82,133,0.06)',
          }}>
            <div style={{
              fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#7A6B72', marginBottom: 8,
            }}>
              {t('auth.forgot.title')}
            </div>
            <p style={{ margin: 0, fontSize: 13, color: '#A8BDD0', lineHeight: 1.6 }}>
              {t('auth.forgot.subtitle')}
            </p>
          </div>

          {/* Form */}
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

            <div style={{ marginBottom: 28 }}>
              <label style={{
                display: 'block', fontSize: 11, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#7A6B72', marginBottom: 6,
              }}>
                {t('auth.forgot.email_label')}
              </label>
              <input
                className="fp-input"
                type="email"
                placeholder="you@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            {/* Submit */}
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
                  {t('auth.forgot.loading')}
                </>
              ) : t('auth.forgot.button')}
            </div>

            <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#7A6B72' }}>
              {t('auth.forgot.remember_password')}{' '}
              <span
                onClick={() => navigate('/login')}
                style={{ color: '#2F5285', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {t('auth.forgot.sign_in')}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
